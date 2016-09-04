var Promise = require('bluebird');
var express = require('express');
var app = express();
var api = require("./server/api");
var mongoose = require("mongoose");
var data;

connectToDb();

function connectToDb(){
  var db = mongoose.connection;
  mongoose.connect('mongodb://localhost/projects');

  db.once('open', function () {
    	data = require('./server/data')(db);
      initApp();
  });
}

function initApp(){
  api(app, data);

  app.use(express.static('client'));

  app.listen(3000, function () {
    console.log('listening on port 3000!');
  });
}


