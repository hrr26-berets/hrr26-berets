const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.port || 3000;
const app = express();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
var nodemailer = require('nodemailer');
const handler = require('./request-handler');

const User = require('../db/models/user');
const Product = require('../db/models/product');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// authentication using passport local
app.use(session({
  secret: 'not so secret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

// This is supposed to prevent CORS errors
app.use((req, res, next) => {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 next();
});

var smtTransport = nodemailer.createTransport({
  service:'gmail',
  host:'beretsberet@gmail.com',
  auth: ({
    user:'beretsberet@gmail.com',
    pass:'dummy123'
  })
})

var mailOptions = {
  from:'Admin <beretsberet@gmail.com',
  to:'bois.bb18@gmail.com',
  subject:'Hello World!',
  text:'Hello World!'
}


app.listen(PORT, (req, res) => {
  console.log('listening on port ', PORT);
});

app.get('/message', (req,res) => {
  smtTransport.sendMail(mailOptions,(err,response) => {
    if(err) { throw err}
      console.log('It works');
    res.status(200)
  });
})

// handle product information in db
app.get('/update',handler.updateProducts);
app.post('/save',handler.save_shopping);

// handle data fetch from Walmart API
app.get('/lookupItem', handler.lookUp);
app.get('/search', handler.search);
app.get('/trending', handler.getTrending);

// handle user authentication
app.post('/signup', handler.signUpUser);
app.post('/login', handler.logInUser);
app.get('/logout', handler.logOutUser);
