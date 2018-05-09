var express = require('express');
var app = express();
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/wunderlist';
var fs = require('fs');
var path = require('path');

app.use("/src", express.static(__dirname + "/src"));
//Todo should be used with xhr
app.use("/resource", express.static(__dirname + "/resource"));

var config = require('./resource/config.json');
mongoose.connect(mongoDB);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connection error'));

app.get('/', function (request, response) {
    response.sendFile('./public/index.html', {
        root: __dirname
    });
});

app.listen(config[0].PORT, function () {
    console.log('Example app listening on port 3000!');
});