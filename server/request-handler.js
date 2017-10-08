const express = require('express');
const router = express.Router();
const request = require('request');
const rp = require('request-promise');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../db/models/user');
const Product = require('../db/models/product');
const walmartKey = require('./api-keys');
const walmartReq = require('walmart')(walmartKey.walmartKey);
const nodemailer = require('nodemailer');
const cache = require('./api-requests');
const _ = require('lodash');
passport.use(User.createStrategy());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


exports.signUpUser = (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) { return res.send(err); }
    let obj = { 'My WishList': [] };
    User.findOneAndUpdate({username: req.body.username}, {'$set': { shoppingList: obj }}, {upsert: true, new: true, runValidators: true, strict: false, overwrite: true}).exec((err, updatedUser) => {
      if (err) { console.log(err); }
      passport.authenticate('local')(req, res, () => {
        console.log('Req.user -> ', req.session);
        res.json({ message: 'signup success' });
      });
    });
  });
};


exports.logInUser = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  passport.authenticate('local')(req, res, () => {

    res.redirect('/');
  });
};


exports.logOutUser = (req, res) => {
  req.logout();
  res.redirect('/');
};

let filterWords = (name) => {
  return name.split(' ').reduce( (acc, el) => {
    if (el.toLowerCase() === 'refurbished' || el.toLowerCase() === 'used') {
      acc = false;
    }
    return acc;
  }, true);
};


exports.search = (req, res) => {
  let test = req.query.query;
  walmartReq.search(test).then((products) => {
    if (products.totalResults === 0) {
      //If no products match the search query, the response has no products.items property and reduce will fail.  Here's a fallback to handle that case.
      return res.json([]);
    }
    let arr = products.items.reduce((acc, el) => {
      let obj = {};
      if (filterWords(el.name)) {
        obj.name = el.name;
        obj.price = el.salePrice;
        obj.image = el.thumbnailImage;
        obj.url = el.productUrl;
        obj.itemId = el.itemId;
        acc.push(obj);
      }

      return acc;
    }, []);
    res.json(arr.slice(0, 5));
  });
};


let lookUp = (itemId, cb) => {
  let options = {
    uri: 'http://api.walmartlabs.com/v1/items/' + itemId,
    qs: {
      apiKey: walmartKey.walmartKey,
      format: 'json'
    },
    json: true
  };
  rp(options)
    .then((item) => {
      let details = {};
      details.name = item.name;
      details.desc = item.longDescription;
      details.imageUrl = item.largeImage;
      details.thumbnailImage = item.thumbnailImage;
      details.price = item.salePrice;
      cb(details);
    })
    .catch((err) => {
      console.log(err);
    });
};





let storeproductsInCache = (itemId, res) => {
  setTimeout( () => {
    lookUp(itemId, list => {
      cache.hmset(itemId, {array: JSON.stringify(list)}, (err, result) => {
        if (err) {
          console.log('Error --> ', err);
        } else {
          res.json(list);
        }
      });
    });
  }, 1000);
};



exports.cachedProductDetails = (req, res) => {
  let itemId = req.query.query;
  cache.hgetall(itemId, (err, list ) => {
    if (list) {
      var obj = JSON.parse(list.array);
      res.json(obj);
      cache.expire(itemId, 3600);
    } else {
      storeproductsInCache(itemId, res);
    }
  });
};


exports.getTrending = (req, res) => {
  let options = {
    uri: 'http://api.walmartlabs.com/v1/trends',
    qs: {
      apiKey: walmartKey.walmartKey,
      format: 'json'
    },
    json: true
  };
  rp(options)
    .then((result) => {
      let items = result.items.slice(0, 5).map(item => {
        return {
          name: item.name,
          image: item.thumbnailImage,
          itemId: item.itemId,
          price: item.salePrice,
          url: item.productUrl
        };
      });
      res.json(items);
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.storeProduct = (product) => {
  let now = new Date();
  let storingItem = product;
  Product.findOne({itemId: storingItem.itemId, name: storingItem.name }).exec((err, found) => {
    if (found) {
      //res.status(200);
      console.log('It exists');
      return;
    } else {
      let newProduct = new Product({
        name: storingItem.name,
        itemId: storingItem.itemId,
        price: storingItem.price,
        updatedAt: now
      });
      newProduct.save((err, newProduct) => {
        if (err) {
          console.log('ERROR:', error);
          return;
        }
      });
    }
  });
};

exports.retrieveShopping = function(req, res) {
  console.log('Get User --> ', req.session.passport.user);
  if (req.session.passport.user) {
    let username = req.session.passport.user;
    User.findOne({username: username}).exec((err, user) => {
      if (user) {
        res.status(201);
        res.json(user.shoppingList);
      } else {
        console.log(err);
        res.status(404);
        res.send('User not found!');
      }
    });

  } else {
    res.status(400);
    res.send('Unauthorized access!');
  }
};
exports.saveExisting = (req, res) => {
  let list = req.body;
  let listName;
  if (req.session.passport.user) {
    for (let key in list) {
      listName = key;
      list[key].forEach((item) => {
        exports.storeProduct(item);
      });
    }
    let username = req.session.passport.user;
    let obj = {};
    User.findOne({username: username}).exec((err, user) => {
      if (user) {
        obj = user.shoppingList;
        if (obj[listName]) {
          obj[listName] = list[listName];
          User.findOneAndUpdate({username: username}, {'$set': {shoppingList: obj}}, {upsert: true, new: true, runValidators: true, strict: false, overwrite: true}).exec((err, updatedUser) => {
            if (err) {
              console.log('Error --> ', err);
            } else {
              console.log('It saved a user -> ', updatedUser);
              res.status(200).json(updatedUser);
            }
          });
        }
      }
    });
  }
};

exports.createList = (req, res) => {
  let username = req.session.passport.user;
  let newName = 'Untitled';
  User.findOne({username: username}).exec((err, user) => {
    if (user) {
      let obj = user.shoppingList;
      if (obj[newName]) {
        let i = 1;
        let newNewName;
        while (true) {
          let temp = newName + ' ' + i;
          if (!obj[temp]) {
            newNewName = temp;
            break;
          }
          i++;
        }
        obj[newNewName] = [];
      } else {
        obj[newName] = [];
      }
      User.findOneAndUpdate({username: username}, {'$set': { shoppingList: obj }}, {upsert: true, new: true, runValidators: true, strict: false, overwrite: true}).exec((err, updatedUser) => {
        if (err) { console.log(err); }
        res.json(updatedUser);
      });
    }
  });
};

exports.removeList = (req, res) => {
  let username = req.session.passport.user;
  let listName = Object.keys(req.body)[0];
  User.findOne({username: username}).exec((err, user) => {
    if (user) {
      let obj = user.shoppingList;
      delete obj[listName];
      User.findOneAndUpdate({username: username}, {'$set': { shoppingList: obj }}, {upsert: true, new: true, runValidators: true, strict: false, overwrite: true}).exec((err, updatedUser) => {
        if (err) { console.log(err); }
        res.json(updatedUser);
      });
    }
  });
};



exports.renameList = (req, res) => {
  let username = req.session.passport.user;
  let oldName = req.body[0];
  let newName = req.body[1];
  User.findOne({username: username}).exec((err, user) => {
    if (user) {
      let obj = user.shoppingList;
      if (obj[newName]) {
        let i = 1;
        let newNewName;
        while (true) {
          let temp = newName + ' ' + i;
          if (!obj[temp]) {
            newNewName = temp;
            break;
          }
          i++;
        }
        obj[newNewName] = obj[oldName];
      } else {
        obj[newName] = obj[oldName];
      }
      delete obj[oldName];
      User.findOneAndUpdate({username: username}, {'$set': { shoppingList: obj }}, {upsert: true, new: true, runValidators: true, strict: false, overwrite: true}).exec((err, updatedUser) => {
        if (err) { console.log(err); }
        res.json(updatedUser);
      });
    }
  });
};

exports.saveShopping = function(req, res, next) {
  let test = {techShopping: [{'name': 'Apples iPod touch 16GB', 'price': 225, 'itemId': 42608132},
    {'name': 'Xbox Ones S Battlefield 1 500 GB Bundle', 'price': 279, 'itemId': 54791579},
    {'name': 'LG DVD Player with USBs Direct Recording (DP132)', 'price': 27.88, 'itemId': 333963490}]};

  let list = req.body || test;
  if (req.session.passport.user) {
    for (let key in list) {
      list[key].forEach((item) => {
      //req.body = item;
        exports.storeProduct(item);
      });
    }
    let username = req.session.passport.user;
    let obj = {};
    User.findOne({username: username}).exec((err, user) => {
      if (user) {
        if (user.shoppingList) {
          obj = user.shoppingList;
        }
        for (let key in list) {
          if (obj[key] || key === 'Untitled') {
            let i = 1;
            let newName;
            while (true) {
              let temp = key + ' ' + i;
              if (!obj[temp]) {
                newName = temp;
                break;
              }
              i++;
            }
            console.log('It found duplicate key --> ', newName);
            obj[newName] = list[key];
          } else {
            obj[key] = list[key];
          }
        }
        User.findOneAndUpdate({username: username}, {'$set': {shoppingList: obj}}, {upsert: true, new: true, runValidators: true, strict: false, overwrite: true}).exec((err, newUser) => {
          if (err) {
            console.log('Error --> ', err);
          } else {
            console.log('It saved a user -> ', newUser);
            res.status(200).json(newUser);
          }
        });
      }
    });
  }
};

let smtTransport = nodemailer.createTransport({
  service: 'gmail',
  host: 'beretsberet@gmail.com',
  auth: ({
    user: 'beretsberet@gmail.com',
    pass: 'dummy123'
  })
});

let mailOptions = {
  from: 'Admin <beretsberet@gmail.com',
  to: 'bois.bb18@gmail.com',
  subject: 'Hello World!',
  text: 'Hello World!'
};

let handleRequests = (product, callback) => {
  console.log(' Products --> ', product);
  if (product) {
    walmartReq.getItem(product.itemId).then((item) => {

      if (product.price !== item.product.buyingOptions.price.currencyAmount) {
        callback(item);
      }
    });
  }
};
// Please pass one of these categoryIds when making feature wishlist
//Beaty ----->  '1085666'
//Clothing --> '5438'
//Electronics  ---> '3944'
//Helth ---> '976760'
let removeSpecialCharacter = (sentence) => {
  return sentence.split(' ').map((word) => {
    return word.split('').filter((letter) => {
      if (letter === ',' || letter === '\'' || letter === '"') {
        return false;
      } else {
        return true;
      }

    }).join('');
  }).join(' ');
};

// exports.popularCategories = (req, res) => {
let getWishlist = (categoryid, cb) => {
  //let categoryid = req.query.query || 976760;
  //console.log(categoryid);
  walmartReq.feeds.bestSellers(categoryid).then((items) => {
    let arr = items.items.reduce((acc, el) => {
      let obj = {};
      if (filterWords(el.name)) {
        var name = removeSpecialCharacter(el.name);
        obj.name = name;
        obj.itemId = el.itemId;
        obj.desc = el.longDescription;
        obj.imageUrl = el.largeImage;
        obj.price = el.salePrice;
        obj.productUrl = el.productUrl;
        acc.push(obj);
      }
      return acc;
    }, []);
    cb(arr.slice(0, 5));
  });
};

let storeitemsInCache = (categoryid, res, count) => {
//_.debounce((categoryid,res) => {
  setTimeout( () => {
    // console.log('It is being invoked');

    getWishlist(categoryid, list => {
      cache.hmset(categoryid, {array: JSON.stringify(list)}, (err, result) => {
        if (err) {
          console.log('Error --> ', err);
          console.log('Count --> ', count);
        } else {
          res.json(list);
        }
      });
    });
  }, 1000);
};



exports.cachedWishlist = (req, res) => {
  let categoryid = req.query.query;
  let count = 0;
  cache.hgetall(categoryid, (err, list ) => {
    if (list) {
      var arr = JSON.parse(list.array);
      res.json(arr);
      // It will update feature wishlist in 10 minutes
      cache.expire(categoryid, 12000);
    } else {
      storeitemsInCache(categoryid, res, count + 1);
    }
  });
};







exports.updateProducts = (req, res) => {
  Product.find({}, (err, items) => {
    if (err) {
      console.log('Error --> ', err);
    } else {
      res.json(items);
      let hour = 3 * 60 * 60 * 1000;
      items.forEach((item) => {
        if (((new Date) - item.updatedAt) < hour) {
          handleRequests(item, (newItem) => {
            item.price = newItem.product.buyingOptions.price.currencyAmount;
            item.updatedAt = new Date();


            mailOptions.subject = 'Price changed!';
            mailOptions.text = 'New price is $' + item.price + ' for ' + item.name;
            mailOptions.to = req.session.passport.user;

            smtTransport.sendMail(mailOptions, (err, response) => {
              if (err) { throw err; }
              item.save((err, newProduct) => {
                if (err) {
                  console.log('Error --> ', err);
                  req.status(500).send(err);
                }
                console.log('Product is saved');
              });
            });
          });
        }
      });
    }
  });
};
