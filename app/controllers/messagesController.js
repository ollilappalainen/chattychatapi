'use strict';

var mongoose = require('mongoose'),
Message = mongoose.model('Message');

exports.listMessages = function(req, res) {
  Message.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.sendMessage = function(req, res) {
  var newMessage = new Message(req.body);
  newMessage.save(function(err, message) {
    if (err)
      res.send(err);
    res.json(message);
  });
};

exports.readMessage = function(req, res) {
  Message.findById(req.params.messageId, function(err, message) {
    if (err)
      res.send(err);
    res.json(message);
  });
};

exports.updateMessage = function(req, res) {
  Message.findOneAndUpdate({_id: req.params.messageId}, req.body, {new: true}, function(err, message) {
    if (err)
      res.send(err);
    res.json(message);
  });
};

exports.deleteMessage = function(req, res) {
  Message.remove({
    _id: req.params.messageId
  }, function(err, message) {
    if (err)
      res.send(err);
    res.json({ message: 'Message deleted' });
  });
};