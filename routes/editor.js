var express = require('express');
var router = express.Router();

/* GET editor page. */
router.get('/', function(req, res, next) {
  res.render('editor', {
    title: 'Editor',
    scripts: `
      <script src="/modules/filepicker-js/dist/filepicker.min.js"></script>
      <script src='https://dme0ih8comzn4.cloudfront.net/imaging/v3/editor.js'></script>
      <script src="/builds/bundle.min.js"></script>
    `
  })
});

module.exports = router;
