const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.port || 3000;
const app = express();

app.use(bodyParser.json());
bodyParser.urlencoded({extended: true});

app.use(express.static('public'));

app.get('/', (req, res) => {

});

app.listen(PORT, function(req, res) {
  console.log('listening on port ', PORT);
})
