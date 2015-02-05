'use strict';

// Need to add the schema to this

// var User = require('./user.model');

/**
 * Get list
 */

// Richards temp data
// exports.show = function (req, res) {
//   res.status(200).json({
//     "_id": {
//         "$oid": "54d01abc00c2af0c00e6d2dd"
//     },
//     "name": "Richard VanBreemen",
//     "provider": "github",
//     "github": {
//       "updated_at": "2015-02-01T23:12:59Z",
//       "created_at": "2011-08-29T22:49:02Z",
//       "following": 42,
//       "followers": 36,
//       "public_gists": 41,
//       "public_repos": 24,
//       "bio": null,
//       "hireable": true,
//       "email": "rvbsanjose@gmail.com",
//       "location": "Milpitas, CA",
//       "blog": "",
//       "company": "",
//       "name": "Richard VanBreemen",
//       "site_admin": false,
//       "type": "User",
//       "received_events_url": "https://api.github.com/users/rvbsanjose/received_events",
//       "events_url": "https://api.github.com/users/rvbsanjose/events{/privacy}",
//       "repos_url": "https://api.github.com/users/rvbsanjose/repos",
//       "organizations_url": "https://api.github.com/users/rvbsanjose/orgs",
//       "subscriptions_url": "https://api.github.com/users/rvbsanjose/subscriptions",
//       "starred_url": "https://api.github.com/users/rvbsanjose/starred{/owner}{/repo}",
//       "gists_url": "https://api.github.com/users/rvbsanjose/gists{/gist_id}",
//       "following_url": "https://api.github.com/users/rvbsanjose/following{/other_user}",
//       "followers_url": "https://api.github.com/users/rvbsanjose/followers",
//       "html_url": "https://github.com/rvbsanjose",
//       "url": "https://api.github.com/users/rvbsanjose",
//       "gravatar_id": "",
//       "avatar_url": "https://avatars.githubusercontent.com/u/1013085?v=3",
//       "id": 1013085,
//       "login": "rvbsanjose"
//     },
//     "skills": [
//       {
//         "skillname": "Angular",
//         "githublink": "https://github.com/rvbsanjose/selfeeds"
//       },
//       {
//         "skillname": "Python",
//         "githublink": "https://github.com/rvbsanjose/python"
//       },
//       {
//         "skillname": "Lua",
//         "githublink": "https://github.com/rvbsanjose/lua"
//       },
//       {
//         "skillname": "PHP",
//         "githublink": "https://github.com/rvbsanjose/php"
//       },
//       {
//         "skillname": "Julia",
//         "githublink": "https://github.com/rvbsanjose/julia"
//       },
//       {
//         "skillname": "Backbone",
//         "githublink": "https://github.com/rvbsanjose/500_Backbone"
//       }
//     ],
//     "role": "user",
//     "__v": 0,
//     "languages": {
//       "TypeScript": 16649,
//       "Java": 25348,
//       "PHP": 2274,
//       "Lua": 272,
//       "Python": 13165,
//       "Julia": 808,
//       "Makefile": 897,
//       "Shell": 40957,
//       "Dart": 31371,
//       "Ruby": 192180,
//       "CoffeeScript": 78727,
//       "CSS": 442212,
//       "JavaScript": 12742586
//     },
//     critter: {
//       "dob": "02-03-2015",
//       "name": "Mongolicious",
//       "level": 109,
//       "type": "Air",
//       "food": {
//         "current": 103,
//         "needed": 417
//       }
//     }
//   });
// };

/***** Copied from tikr edit as required *****/
'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    console.log("LOGGING USER JSON", user);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Query for users by skills
 */
exports.search = function(req, res, next) {
  // return users who have all of the specified skills
  if(req.body.hasAllSkills){
    User.find({'skills': { $all: req.body.skills}}, '-salt -hashedPassword', 
     function(err, users) {
      if (err) return next(err);
      if (!users) return res.json(401);
      res.json(users);
    });
  } else { // return users who have at least one of the skills
    User.find({'skills': { $in: req.body.skills }}, '-salt -hashedPassword', 
     function(err, users) {
      if (err) return next(err);
      if (!users) return res.json(401);
      res.json(users);
    });
  }
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

exports.getUserProfile = function(req, res, next){

  User.findOne({'github.login': req.params.githubUsername},
    '-salt -hashedPassword',
    function(err, user){
      if (err){
        return next(err);
      }
      if (!user){
        return res.send('Could not find that profile', 404);
      }
      //console.log("THISIS THE USER DATA ON THE SERVER", user);
      res.json(user);
  });
};

exports.postNewSkill = function(req, res, next){
  //TODO verify that user authorized to add a skill on server side

  User.findOneAndUpdate(
    {'github.login': req.params.githubUsername},
    {$push: {skills: req.body}},
    {safe: true},
    function(err, user){ //user is the full updated user document (a js object)
      if (err) {
        res.send(500);
      } else {
        res.json(user);
      }
    }
  );
};
/***** End copied from tikr *****/
