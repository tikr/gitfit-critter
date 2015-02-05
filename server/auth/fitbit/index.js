'use strict';
// Currently just copied githug auth from tikr and combining that
// organized structure with the fitbit authorization


// Copied from github/index.js

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.json(401, error);
    if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

    var token = auth.signToken(user._id, user.role);
    res.json({token: token});
  })(req, res, next)
});

module.exports = router;

// Copied from ./utils/fitbit.js
var FitbitStrategy = require('passport-fitbit').Strategy;
var FitbitApiClient = require('fitbit-node');
var passport = require('passport');

module.exports = exports = {
  fitbitStrategy: new FitbitStrategy({
      consumerKey: process.env.CONSUMER_KEY,
      consumerSecret: process.env.CONSUMER_SECRET,
      callbackURL: '/auth/fitbit/callback',
      userAuthorizationURL: 'https://www.fitbit.com/oauth/authorize'
    }, function (token, tokenSecret, profile, done) {
      //after oath login call this success handler
          //add user to db
/***** Change to mongodb *****/
          dbHelper.addUser(token, tokenSecret, profile);
          //this line waits for 26 to finish
          exports.getStats(profile.id, token, tokenSecret).then(function() {
            //done tells the program you are done and want to go to the next step
            done(null, profile._json.user);
          });
        }),

  getStats: function (userID, token, secret) {
    var client = new FitbitApiClient(process.env.CONSUMER_KEY, process.env.CONSUMER_SECRET);
    //creates the request to get activites json from fitbit
    return client.requestResource('/activities.json', 'GET', token, secret).then(function (data) {
        //success handler for req, return the promise
/***** Change to mongodb *****/
        dbHelper.addUserStats(userID, data[0]);
      }, function (err) {
        console.log('ERROR!',err);
      });
  }
};