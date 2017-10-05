const mongoose = require('mongoose');
mongoUri = 'mongodb://localhost/wishlist';
mongoose.connect(process.env.MONGODB_URI || mongoUri, {useMongoClient:true});

const db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error:'));

db.once('open', () => {
  console.log('mongodb connection open');
})

module.exports = db;
