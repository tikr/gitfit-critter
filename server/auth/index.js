'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config');
var User = require('../api/user/user.model');

// Passport Configuration
require('./github/passport').setup(User, config);
require('./fitbit/passport').setup(User, config);

var router = express.Router();

router.use('/github', require('./github'));
router.use('/fitbit', require('./fitbit'));

module.exports = router;