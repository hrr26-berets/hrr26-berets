const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../db/models/user');
const Product = require('../db/models/product');
const walmartKey = require('./api-keys')
const walmartReq = require('walmart')(walmartKey.walmartKey);

passport.use(User.createStrategy());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.signUpUser = (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) { return res.send(err); }
    passport.authenticate('local')(req, res, () => {
      console.log('Req.user -> ',req.session);
      res.json({ message: 'signup success' });
    });
  });
};

exports.logInUser = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  passport.authenticate('local')(req, res, () => {
      console.log('Session --> ',req.session);
    res.redirect('/');
    })
};

exports.logOutUser = (req, res) => {
  req.logout();
  res.redirect('/');
};

let filterWords = (name) => {
 return name.split(' ').reduce( (acc,el) => {
    if(el.toLowerCase() === 'refurbished' || el.toLowerCase() === 'used') {
      acc = false;
    }
    return acc;
 }, true);
}


exports.search = (req, res) => {
  let test = req.query.query
  walmartReq.search(test).then((products) => {
    if (products.totalResults === 0) {
      //If no products match the search query, the response has no products.items property and reduce will fail.  Here's a fallback to handle that case.
      return res.json([]);
    }
    let arr = products.items.reduce((acc, el) => {
        let obj = {}
        if (filterWords(el.name)) {
        obj.name = el.name;
        obj.price = el.salePrice;
        obj.image = el.thumbnailImage;
        obj.url = el.productUrl;
        obj.itemId = el.itemId;
        acc.push(obj);
        }
        // if(acc.length === 1) {
        //   console.log('El --> ',el);
        // }
        return acc;
    },[]);
    res.json(arr.slice(0,5));
  })
};


exports.lookUp = (req, res) => {
  console.log("query", req.query.query);
  let itemId = req.query.query;
  walmartReq.getItem(itemId)
    .then((item) => {
      let details = {};
      details.name = item.product.productName;
      details.desc = item.product.longDescription;
      details.imageUrl = item.product.primaryImageUrl;
      details.price = item.product.buyingOptions.price.currencyAmount;
      res.json(details);
    })
}


exports.storeProduct = (req,res,next) => {
  let now = new Date();
  let storingItem = req.body;
  Product.findOne({itemId : storingItem.itemId ,name: storingItem.name}).exec((err,found) => {
    if(found) {
     res.status(200);
      next();
    } else {
      let newProduct = new Product({
          name:storingItem.name,
          itemId: storingItem.itemId,
          price: storingItem.price,
          updatedAt: now
      });
      newProduct.save((err, newProduct) =>  {
        if (err) {
          req.status(500).send(err);
        }
        res.status(200);
        next();
      })
    }
  })
} 




exports.save_shopping = function(req,res,next) {
  let test = {techShopping: [{"name":"Apple iPod touch 16GB","price":225,"itemId":42608121},
  {"name":"Xbox One S Battlefield 1 500 GB Bundle","price":279,"itemId":54791566},
  {"name":"LG DVD Player with USB Direct Recording (DP132)","price":27.88,"itemId":33396346}]}
let list = req.body.shoppingList || test
if (req.session.passport.user) {
  for (let key in list) {
    list[key].forEach((item) => {
      req.body = item;
      exports.storeProduct(req,res,next);
   });
  }
  let username = req.session.passport.user;
  let obj = {};
  User.findOne({username: username}).exec((err,user) => {
    if(user) {
      if (user.shoppingList) {
        obj = user.shoppingList;
      }
      for(let key in list) {
        obj[key] = list[key].reduce((acc,el) => {
          acc.push({ name: el['name'], itemId: el['itemId']});
          return acc;
        },[]);
      }
      User.findOneAndUpdate({username:username},{"$set":{shoppingList: obj}},{upsert: true, new: true, runValidators: true,strict:false,overwrite:true}).exec((err,newUser) =>  {
      if(err) {
        console.log('Error --> ',err);
      } else {
        console.log('It saved a user -> ',newUser);
        res.status(200).json(newUser);
       }
     })
    }
  })
 }
}
