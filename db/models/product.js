const mongoose = require('mongoose');
const db = require('../config');
const Schema = mongoose.Schema;


mongoose.Promise = require('bluebird');

const Product = new Schema({
  name: String,
  itemId: Number,
  price: Number,
  updatedAt: { type: Date, default: Date.now}
});


module.exports = mongoose.model('Product', Product);
