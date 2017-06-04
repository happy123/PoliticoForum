var express = require('express');
var router = express.Router();

module.exports = function(db) {

  router.post('/', function(req, res, next) {
    req.body.author_id = req.user.id;
    db.comments.save(req.body, function(err, result) {
      if (err) next(err);
      res.redirect('/topics/'+req.body.topic_id);
    });
  });

  return router;
};
