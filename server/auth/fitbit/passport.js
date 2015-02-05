// Currently just copied githug auth from tikr and combining that
// organized structure with the fitbit authorization

// Copied from github/passport.js
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (User, config) {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      User.findOne({
        email: email.toLowerCase()
      }, function(err, user) {
        if (err) return done(err);

        if (!user) {
          return done(null, false, { message: 'This email is not registered.' });
        }
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'This password is not correct.' });
        }
        return done(null, user);
      });
    }
  ));
};

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