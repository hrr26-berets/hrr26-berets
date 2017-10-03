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
      res.json({ message: 'signup success' });
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
  let test = 49920630;
  walmartReq.search(test).then((products) => {
    let desc = products.items.reduce((acc, el) => {
      if (el.itemId === test) {
        acc.images = el.imageEntities[0];
        acc.url = el.productUrl;
        acc.description = el.longDescription;
        acc.name = el.name;
        acc.price = el.salePrice;
      }
      return acc;
    },{})
    res.json(desc);
  });
}
// {"name":"Apple iPod touch 16GB","price":225,"itemId":42608121},
//{"name":"Xbox One S Battlefield 1 500 GB Bundle","price":279,"itemId":54791566}
// {"name":"LG DVD Player with USB Direct Recording (DP132)","price":27.88,"itemId":33396346}

// exports.saveList = (req,res) => {

// }

exports.storeProduct = (req,res,next) => {
  let now = new Date();
  let storingItem = req.body;

  Product.findOne({itemId : storingItem ,name: storingItem.name}).exec((err,found) => {
    if(found) {
      res.json({message:'It is already exist'});
    } else {
      let newProduct = new Product({
          name:storingItem.name,
          itemId: storingItem.id,
          price: storingItem.price,
          updatedAt: now
      });
      newProduct.save((err,newProuct) =>  {
        if (err) {
          req.status(500).send(err);
        }
        // res.status(200).send(newProduct);
        next()
      })
    }
  })
}
