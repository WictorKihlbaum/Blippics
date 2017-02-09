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
        local: true,
        pageSpecificStyles: '',
        pageSpecificScripts: `
          <script src="https://dme0ih8comzn4.cloudfront.net/imaging/v3/editor.js"></script>
          <script src="/javascripts/AviaryHandler.js"></script>
          <script src="/javascripts/LocalHandler.js"></script>
          <script src="/javascripts/Message.js"></script>
          <script src="/javascripts/ActionButtons.js"></script>
        `,
    });
});

// Dropbox view
router.get('/dropbox', function(req, res, next) {
    res.render('shared/editView', { title: 'Dropbox view' });
});

// OneDrive view
router.get('/onedrive', function(req, res, next) {
    res.render('shared/editView', {
        title: 'OneDrive view',
        buttonFunction: 'OneDriveHandler.launchOneDrivePicker()',
        pageSpecificStyles: '',
        pageSpecificScripts: `
          <script src="https://js.live.net/v7.0/OneDrive.js"></script>
          <script src="/javascripts/OneDriveHandler.js"></script>
          <script src="https://dme0ih8comzn4.cloudfront.net/imaging/v3/editor.js"></script>
          <script src="/javascripts/AviaryHandler.js"></script>
          <script src="/javascripts/ActionButtons.js"></script>
          <script src="/javascripts/Toast.js"></script>
        `
    });
});

// Google Drive view
router.get('/google-drive', function(req, res, next) {
    res.render('googleDrive', {
        title: 'Google Drive view',
        pageSpecificStyles: `
          <link rel="stylesheet" href="/modules/spinkit/css/spinners/6-chasing-dots.css" />
        `,
        pageSpecificScripts: `
          <script src="https://apis.google.com/js/platform.js"></script>
          <script src="https://apis.google.com/js/client.js"></script>
          <script src="https://dme0ih8comzn4.cloudfront.net/imaging/v3/editor.js"></script>
          <script src="/javascripts/Message.js"></script>
          <script src="/javascripts/GoogleDriveHandler.js"></script>
          <script src="/javascripts/AviaryHandler.js"></script>
          <script src="/javascripts/SignHandler.js"></script>
          <script src="/javascripts/Toast.js"></script>
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
    res.render('selfie', {
        title: 'Selfie view',
        pageSpecificStyles: '<link rel="stylesheet" href="/stylesheets/selfie-styles.css" />',
        pageSpecificScripts: '<script src="/javascripts/SelfieHandler.js"></script>'
    });
});

module.exports = router;
