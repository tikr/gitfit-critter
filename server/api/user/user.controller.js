'use strict';

var User = require('./user.model');
var github = require('octonode');
var config = require('../../config');
var moment = require('moment');
var passport = require('passport');
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

exports.dailyCommits = function (req, res) {
  var todaysCommits = [];
  var githubClient = github.client(config.cronToken);
  githubClient.get('/users/' + req.params.username + '/events', {}, function(err, status, events, headers){
    for(var i = 0; i < events.length; i++){
      var e = events[i];
      if(e.type === 'PushEvent'){
        var timestamp = moment(e.created_at, moment.ISO_8601);
        var midnight = moment().startOf('day');
        if(timestamp.isAfter(midnight)){
          var pushEvent = {};
          pushEvent.hour = timestamp.get('hour');
          pushEvent.numCommits = e.payload.size;
          pushEvent.repoName = e.repo.name;
          todaysCommits.push(pushEvent);
        }
      }
    }
    if (err) res.status(404).end();
    if (events) res.status(200).json(todaysCommits);
  });
};

/**
 * Get a single user
 */
 // Richards temp data
 exports.show = function (req, res) {
   User.findOne({
     'github.login': req.params.username
   }, function (err, user) {
    if (err) res.status(404).end();
    if (user) res.status(200).json(user);
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
  }, '-salt -hashedPassword', function(err, user) {
    if (err) return next(err);
    if (!user) return res.json(401);
    res.status(200).json(user);
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
