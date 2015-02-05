'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github'];
var github = require('octonode');

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

module.exports = mongoose.model('User', UserSchema);