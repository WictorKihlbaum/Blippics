import $ from 'jquery';
import ButtonHandler from './ButtonHandler';
import AviaryHandler from './AviaryHandler';


/*
 * Initialize FullpageJS.
 * TODO: Make this prettier.
 */
$(document).ready(() => {
  $('#fullpage').fullpage({
    //Navigation
    navigation: true,
    navigationPosition: 'right',
    slidesNavigation: true,
    slidesNavPosition: 'bottom',

    // Events
    onLeave: (index, nextIndex, direction) => {
      // User goes to Editor view.
      if (nextIndex == 2) {

        // Add choose button if not yet added.
        if (!document.getElementById('choose-button')) {
          ButtonHandler.addChooseButton();
        }

        // Init image editor if it hasn't already.
        if (typeof AviaryHandler.editor === 'undefined') {
          AviaryHandler.initiateEditor();
        }

        // Add animations.
        $('#editor-grid')
          .addClass('animated fadeIn')
          .css('animation-delay', '0.3s');

        $('#image-preview')
          .addClass('animated bounceIn')
          .css('animation-delay', '0.75s');

        $('#choose-button')
          .addClass('animated bounceIn')
          .css('animation-delay', '1.4s');
      }
    }

  });
});

/* 1) Add a click handler to a button that calls a helper function */
$('#csdk-login').click(() => {

  console.log(AdobeCreativeSDK);

  /* 2) Get auth status */
  AdobeCreativeSDK.getAuthStatus(csdkAuth => {

    /* 3) Handle auth based on status */
    if (csdkAuth.isAuthorized) {
      // The user is logged in and has authorized your site.
      console.log('Logged in!');
    } else {
      // Trigger a login
      AdobeCreativeSDK.login(handleCsdkLogin);
    }
  });

});