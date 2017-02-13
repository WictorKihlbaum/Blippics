var express = require('express');
var router = express.Router();

/* GET picker page. */
router.get('/', function(req, res, next) {
  res.render('picker', { title: 'Picker' });
});

module.exports = router;
