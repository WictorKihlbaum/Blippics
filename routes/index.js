var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Home',
    pageSpecificStyles: '<link rel="stylesheet" href="/stylesheets/blippics-banner.css" />'
  });
});

module.exports = router;
