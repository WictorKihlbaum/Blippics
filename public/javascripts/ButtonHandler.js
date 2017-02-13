import AviaryHandler from './AviaryHandler';
import $ from 'jquery';
import Button from './Button';
import Secrets from '../../API_Keys.json';
import Message from './Message';


class ButtonHandler {

  static addChooseButtonFunctionality() {
    const button = new Button('choose', 'photo');

    $('#choose-button').click(() => {
      filepicker.setKey(Secrets.Filepicker);
      filepicker.pick(
        {
          mimetypes: ['image/png', 'image/jpg', 'image/jpeg'],
          services: ['SKYDRIVE', 'COMPUTER', 'GOOGLE_DRIVE', 'DROPBOX', 'WEBCAM'],
          language: 'en',
          customCss: '//localhost:8888/stylesheets/filepicker-dialog.css'
        },
        function onSuccess(blob) {
          // Save mimetype for later use.
          ButtonHandler.imageMimetype = blob.mimetype;
          // Show image and add edit button.
          $('#image-preview').attr('src', blob.url);
          ButtonHandler.addEditButton(blob.url);
          AviaryHandler.instantiateFeather(); // TODO: Make better solution.
        },
        function onError(fpError) {
          Message.show(fpError.toString(), 'user-message-error');
        }
      );
    });
  }

  static addSaveButton(url) {
    const button = new Button('save');
    $('#save-button-field').html(button);
    $('#save-button').click(() => {
      filepicker.exportFile(
        url,
        {
          suggestedFilename: 'newImage',
          mimetype: ButtonHandler.imageMimetype,
          services: ['SKYDRIVE','COMPUTER','GOOGLE_DRIVE','DROPBOX'],
          language: 'en'
        }
      );
    });
  }

  static removeButtons() {
    $('#edit-button').remove();
    $('#save-button').remove();
  }

  static addEditButton(url) {
    const button = new Button('edit');
    $('#edit-button-field').html(button);
		$('#edit-button').click(() => {
      AviaryHandler.launchEditor('image-preview', `${url}`);
    });
	}

}

export default ButtonHandler;
