// var Users  = require('../app/controllers/users');

var users = require('express').Router();

users.get('/api/users/:username', function (req, res) {
  res.status(200).json('hello world');
})

users.all('*', function (req, res) {
  res.sendFile('index.html', { root: __dirname + '/../public/' });
});

module.exports = {
  users: users,
};
