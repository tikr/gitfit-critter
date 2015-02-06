'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', function(req, res, next){
      
      var id = req.url.split('&')[0].split('=')[1];
      var type = req.url.split('&')[1].split('=')[1];
      console.log('req', id, type)
  	passport.authenticate('github', {
      failureRedirect: '/',
      session: false,
      // pull off encodedId from URL
      // todo get type of critter
      state: id+'#'+type
    })(req, res, next);
  })

  .get('/callback', passport.authenticate('github', {
    failureRedirect: '/',
    session: false
  }), function(req, res){
      res.redirect('/critter/'+req.user.github.login)
  });

module.exports = router;