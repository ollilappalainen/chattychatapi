'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MessageSchema = new Schema({
  message: {
    type: String,
    required: 'Please enter a message'
  },
  sent: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: 'Add username.'
  }
});

module.exports = mongoose.model('Message', MessageSchema);