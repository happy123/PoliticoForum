var express = require('express');
var router = express.Router();
var utils = require('./utils');

/* GET home page. */

router.get('/', utils.jumpToProfile, function(req, res) {
  res.render('index', { title: 'Express!!!!!!' });
});

module.exports = router;
