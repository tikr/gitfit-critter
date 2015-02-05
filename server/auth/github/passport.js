exports.setup = function (User, config) {
  var passport = require('passport');
  var GitHubStrategy = require('passport-github').Strategy;

  passport.use(new GitHubStrategy({
      clientID: config.github.id,
      clientSecret: config.github.secret,
      callbackURL: config.github.callbackURL,
      passReqToCallback: true
    },
    function(req, token, tokenSecret, profile, done) {
      User.findOne({
        'fitbit.user.encodedId': req.query.state
      }, function(err, user) {
        if (err || !user) {
          return done(err);
        } else {
          user.github = profile._json;
          user.save(function(err){
            if(err) throw err;
            return done(err, user);
          });
        }
      });
    }
  ));
};
