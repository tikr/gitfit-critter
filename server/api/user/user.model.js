'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
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

module.exports = mongoose.model('User', userSchema);
