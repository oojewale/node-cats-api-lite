var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/cats');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var cats = require('./cat_routes.js')(app);

var server = app.listen(8000, function() {
  console.log('Server is running at http://127.0.0.1/8000/');
});
