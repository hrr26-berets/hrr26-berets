const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.port || 3000;
const app = express();


app.use(bodyParser.json());
bodyParser.urlencoded({extended: true});

app.use(express.static(__dirname + '../src/public'));

app.get('/', (req, res) => {
  console.log('Hello from server!');
  res.send("Hello World");
});

app.listen(PORT, function(req, res) {
  console.log('listening on port ', PORT);
})