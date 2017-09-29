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
  var test = 'ipod'
  walmartReq.search(test).then(function(products) {
    var arr = products.items.reduce(function(acc,el) {
        var obj = {}
        if (filterWords(el.name)) {
        obj[el.name] = el.salePrice;
        acc.push(obj);
        }
        return acc;
    },[]);
    console.log('Array -- > ',arr.slice(0,5));
    res.json(arr.slice(0,5));
  })
};



