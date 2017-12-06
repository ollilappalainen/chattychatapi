'use strict';
module.exports = function(app) {
  var chattychat = require('../controllers/messagesController');

  // chattychat Routes
  app.route('/messages')
    .get(chattychat.listMessages)
    .post(chattychat.sendMessage);


  app.route('/messages/:messageId')
    .get(chattychat.readMessage)
    .put(chattychat.updateMessage)
    .delete(chattychat.deleteMessage);
};