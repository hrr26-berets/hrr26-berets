const mongoose = require('mongoose');
const db = require('../config');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.Promise = require('bluebird');
const User = new Schema({
  email:{type: String, require: true },
  shoppingList: {type: Mixed}
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',User);


/* User {
  email : ,
  username: ,
  password: ,
  shoppingList: {
    teshShop:[]
    christmas:
  }
}
findOne({username:},{shopping})

 product {
    _id : Number,
    name: 
    itemId: 
    updatedAt:
    price:
}


hp mouse -> 1234

*/

