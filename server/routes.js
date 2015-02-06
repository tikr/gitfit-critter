var users = require('express').Router();
var controller  = require('./api/user/user.controller');

users.get('/:username/dailyCommits', controller.dailyCommits);
users.get('/:username', controller.show);

module.exports = users;
