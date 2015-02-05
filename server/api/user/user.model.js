'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var github = require('octonode');
var moment = require('moment');
var config = require('../../config');

var UserSchema = new Schema({
  name: String,
  email: { type: String, lowercase: true },
  role: {
    type: String,
    default: 'user'
  },
  provider: String,
  salt: String,
  github: {},
  fitbit: {},
  critter: {}
});

UserSchema.methods = {
  getTodaysCommits: function(username){
    var githubClient = github.client(config.cronToken);

    githubClient.get('/users/'+username+'/events', {}, function(err, status, events, headers){
      var todaysCommits = [];
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
      return todaysCommits;
    });
  }
}

module.exports = mongoose.model('User', UserSchema);