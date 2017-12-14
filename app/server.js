const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const router = express.Router();
const cors = require('cors');

const mongoose = require('mongoose');
const Message = require('./models/message');

mongoose.connect('mongodb://127.0.0.1:27017/chattychatdb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

app.use(cors());
router.route('/messages')
  .post(function(req, res, next) {
    new Message({
      message: req.body.message,
      username: req.body.username,
      sent: req.body.sent
    }).save(function(err, post) {
      if (err) res.send(err);
      res.json({
        status: 201,
        body: post
      });
    });        
  })
  
  .get(function(req, res) {
    Message.find(function(err, messages) {
      if (err) res.send(err);
      res.json({
        status: 200,
        body: messages
      });
    });
  });

router.route('/messages/:message_id')
  .get(function(req, res) {
    Message.findById(req.params.message_id, function(err, message) {
      if (err) res.send(err);
      res.json({
        status: 200,
        body: message
      });
    });
  })

  .put(function(req, res) {
    Message.findById(req.params.message_id, function(err, message) {
      if (err) res.send(err);
      
      //message.username = req.body.username || message.username;
      message.message = req.body.message || message.message;
      //message.sent = req.body.message || message.sent;      

      message.save(function(err) {
        if (err) res.send(err);
        res.json({
          status: 201,
          body: message
        });
      });
    });
  })

  .delete(function (req, res) {
    Message.remove({
      _id: req.params.message_id
    }, function(err, message) {
      if (err) res.send(err);
      res.json({
        status: 200,
        body: 'Message deleted.'
      });
    });
  });

app.use('/api', router);

app.listen(port);
console.log('ChatyChatApi app listening on port ' + port + '!');

