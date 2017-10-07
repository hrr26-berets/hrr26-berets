const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
  console.log('Err ---> ',err);
})

client.on('connect', function() {
    console.log('connected');
});


module.exports = client;