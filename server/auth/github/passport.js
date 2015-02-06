exports.setup = function (User, config) {
  var passport = require('passport');
  var moment = require('moment');
  var GitHubStrategy = require('passport-github').Strategy;
  var critters = require('./critters');

  passport.use(new GitHubStrategy({
      clientID: config.github.id,
      clientSecret: config.github.secret,
      callbackURL: config.github.callbackURL,
      passReqToCallback: true
    },
    function(req, token, tokenSecret, profile, done) {
      var id = req.query.state.split('#')[0];
      var type = req.query.state.split('#')[1];
      User.findOne({
        'fitbit.user.encodedId': id
      }, function(err, user) {
        if (err || !user) {
          return done(err);
        } else {
          user.github = profile._json;
          user.critter = critters[type];
          user.critter.DOB = moment().format("YYYY-MM-DD");
          user.save(function(err){
            if(err) throw err;
            return done(err, user);
          });
        }
      });
    }
  ));
};
