var express = require('express');
var router = express.Router();
var utils = require('./utils');

module.exports = function(db) {
  router.get('/new', utils.ensureAuthenticated, function(req, res) {
    res.render('createTopic', { title: 'Express!!!!!!' });
  });

  router.post('/create', function(req, res, next) {
    req.body.author_id = req.user.id;
    db.topics.save(req.body, function(err, result) {
      if (err) next(err);
      res.redirect('/profile');
    });
  });

  router.get('/:topicId', utils.ensureAuthenticated, function(req, res, next) {
    try {
      var topicId = parseInt(req.params.topicId);
    } catch (err) {
      if (err) next(err);
    }
    db.topics.findOne(topicId, function(err, topic) {
      if (err) next(err);

      if (topic) {
        db.fetch_comments(topicId, function(err, comments) {
          if (err) next(err);
          var context = { topic: topic, user: req.user, comments: [] };
            if (comments) {
              context.comments = comments;
            }
            res.render('newDescription', context);
        })
      } else {
        next(new Error("Topic not found."));
      }
    });
  });

  router.post('/viewDescription', function(req, res, next) {
    req.body.author_id = req.user.id;
    console.log(req.body);
    db.comments.save(req.body, function(err, result) {
      if (err) next(err);
      res.redirect('/profile');
    });
  });

  return router;
};
