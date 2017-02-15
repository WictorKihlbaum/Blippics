import $ from 'jquery';
import ButtonHandler from './ButtonHandler';


/*
 * Initialize FullpageJS.
 */
$(document).ready(() => {
  $('#fullpage').fullpage({
    //Navigation
    navigation: true,
    navigationPosition: 'right',

    // Events
    onLeave: (index, nextIndex, direction) => {
      if (index == 1 && nextIndex == 2) {
        $('#dropzone').addClass('animated fadeIn').css('animation-delay', '0.5s');
        $('#choose-button').addClass('animated bounceIn').css('animation-delay', '1.0s');
      }
    }

  });
});

/*
 * Add choose button for image editor.
 */
ButtonHandler.addChooseButton();