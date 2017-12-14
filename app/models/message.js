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

var Message = mongoose.model('Message', MessageSchema);

module.exports = Message;