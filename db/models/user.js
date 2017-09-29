const mongoose = require('mongoose');
const db = require('../config');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.Promise = require('bluebird');

const User = new Schema({
  shoppingList: Schema.Types.Mixed
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
