var mongoose = require('mongoose');
mongoUri = 'mongodb://localhost/wishlist';
mongoose.connect(mongoUri,{useMongoClient:true});

var db = mongoose.connect;

db.on('error',console.error.bind(console,'connection error:'));

db.once('open', function() {
  console.log('mongodb connection open');
})

module.exports = db;