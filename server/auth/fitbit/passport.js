exports.setup = function (User, config) {
  var passport = require('passport');
  var FitbitStrategy = require('passport-fitbit').Strategy;

  passport.use(new FitbitStrategy({
      consumerKey: config.fitbit.id,
      consumerSecret: config.fitbit.secret,
      callbackURL: config.fitbit.callbackURL
    },
    function(token, tokenSecret, profile, done) {
        User.findOne({
          'fitbit.user.encodedId': profile._json.user.encodedId
        }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            user = new User({
              name: profile._json.fullName,
              role: 'user',
              provider: 'fitbit',
              fitbit: profile._json,
              fitbitToken: token,
              fitbitSecret: tokenSecret
            });
            user.save(function(err) {
              if (err) return done(err);
              return done(err, user);
            });
          } else {
            return done(err, user);
          }
        });
    }
  ));
};
