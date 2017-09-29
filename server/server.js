const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.port || 3000;
const app = express();
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy

var User = require('../db/models/user');

app.use(bodyParser.json());
bodyParser.urlencoded({extended: true});

app.use(passport);
app.use(passport.initialize());
app.use(express.static('public'));

app.get('/', (req, res) => {

});

app.listen(PORT, (req, res) => {
  console.log('listening on port ', PORT);
})
