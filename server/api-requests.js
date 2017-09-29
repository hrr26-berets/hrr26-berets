const keys = require('./api-keys');

exports.walmartRequest = (item) => {

let url = 'http://api.walmartlabs.com/v1/search?apiKey=${keys.walmartKey}&lsPublisherId=${keys.publisherId}&query=${item}';

$.ajax({
  url:url,
  type:'GET',
  contentType: 'application/json',
  success:(res) => {
    console.log('Response -> ',res);
  }, 
  error: (err) => {
    console.log('Error -> ',err);
  }

})

}