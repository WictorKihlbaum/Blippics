import $ from 'jquery';
import ButtonHandler from './ButtonHandler';
import AviaryHandler from './AviaryHandler';


/*
 * Initialize FullpageJS.
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
        if (typeof AviaryHandler.feather === 'undefined') {
          AviaryHandler.instantiateFeather();
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