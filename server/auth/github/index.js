'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', function(req, res, next){
  	passport.authenticate('github', {
      failureRedirect: '/',
      session: false,
      // pull off encodedId from URL
      state: req.url.split('=')[1]
    })(req, res, next);
  })

  .get('/callback', passport.authenticate('github', {
    failureRedirect: '/',
    session: false
  }));

module.exports = router;