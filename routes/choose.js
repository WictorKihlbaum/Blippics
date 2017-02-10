var express = require('express');
var router = express.Router();

/* GET choose page. */
router.get('/', function(req, res, next) {
    res.render('choose', { title: 'Choose' });
});

// Local view
router.get('/local', function(req, res, next) {
    res.render('shared/editView', {
        title: 'Local view',
        local: true
    });
});

// Dropbox view
router.get('/dropbox', function(req, res, next) {
    res.render('shared/editView', { title: 'Dropbox view' });
});

// OneDrive view
router.get('/onedrive', function(req, res, next) {
    res.render('shared/editView', { title: 'OneDrive view' });
});

// Google Drive view
router.get('/google-drive', function(req, res, next) {
    res.render('googleDrive', {
        title: 'Google Drive view',
        pageSpecificScripts: `
          <script src="https://apis.google.com/js/platform.js"></script>
          <script src="https://apis.google.com/js/client.js"></script>
          <script src="/javascripts/GoogleDriveHandler.js"></script>
          <script src="/javascripts/SignHandler.js"></script>
          <script>
            function onSignIn(googleUser) {
              SignHandler.signIn(googleUser);
            }
          </script>
        `
    });
});

// Selfie view
router.get('/selfie', function(req, res, next) {
    res.render('selfie', { title: 'Selfie view' });
});

module.exports = router;
