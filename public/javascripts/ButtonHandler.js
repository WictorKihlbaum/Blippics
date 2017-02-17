import AviaryHandler from './AviaryHandler';
import Button from './Button';
import Secrets from '../../Secrets.json';
import $ from 'jquery';


class ButtonHandler {

  static addChooseButton() {
    const button = new Button('choose', 'photo');
    const self = ButtonHandler;

    button.click(() => {
      filepicker.setKey(Secrets.Filepicker);
      filepicker.pick(
        {
          mimetypes: ['image/png', 'image/jpg', 'image/jpeg'],
          services: ['SKYDRIVE', 'COMPUTER', 'GOOGLE_DRIVE', 'DROPBOX','FLICKR', 'WEBCAM'],
          language: 'en'
        },
        function onSuccess(blob) {
          self.removeButtons();
          // Save mimetype for addSaveButton().
          self.imageMimetype = blob.mimetype;
          // Show image and add edit button.
          $('#image-preview').attr('src', `${blob.url}`);
          self.addEditButton(blob.url);
        },
        function onError(fpError) {
          console.log(fpError.toString());
        }
      );
    });
    $('#choose-button-field').append(button);
  }

  static addSaveButton(url) {
    const button = new Button('save');
    this.addAnimation(button);
    button.click(() => {
      filepicker.exportFile(
        url,
        {
          suggestedFilename: 'newImage',
          mimetype: ButtonHandler.imageMimetype,
          services: ['SKYDRIVE','COMPUTER','GOOGLE_DRIVE','DROPBOX', 'FLICKR'],
          language: 'en'
        }
      );
    });
    $('#save-button-field').append(button);
  }

  static addEditButton(url) {
    const button = new Button('edit');
    this.addAnimation(button);
    button.click(() => {
      AviaryHandler.launchEditor('image-preview', `${url}`);
    });
    $('#edit-button-field').append(button);
	}

	static removeButtons() {
    const editButton = $('#edit-button');
    const saveButton = $('#save-button');
    if (editButton) editButton.remove();
    if (saveButton) saveButton.remove();
  }

  static addAnimation(button) {
    return button.addClass('animated bounceIn').css('animation-delay', '1.2s');
  }

}

export default ButtonHandler;