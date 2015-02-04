var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var users = require('./routes/users');

var app = express();

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '/../public')));

app.use('/api/users', users);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


console.log('Express server started');
module.exports = app;
