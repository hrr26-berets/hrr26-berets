const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../db/models/user');
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

exports.search = (req,res) => {
  let test = 'ipod'
  walmartReq.search(test).then((products) => {
    let arr = products.items.reduce((acc,el) => {
        let obj = {}
        if (filterWords(el.name)) {
        obj.name = el.name;
        obj.price = el.salePrice;
        obj.itemId = el.itemId;
        acc.push(obj);
        }
        if(acc.length === 1) {
          console.log('El --> ',el);
        }
        return acc;
    },[]);
    console.log('Array -- > ',arr.slice(0,5));
    res.json(arr.slice(0,5));
  })
};
//42608121

exports.lookUp = (req,res) => {
  let test = 42608121;
  walmartReq.search(test).then((products) => { 
    let desc = products.items.reduce((acc,el) => {
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



