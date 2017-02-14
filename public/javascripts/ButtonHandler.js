import AviaryHandler from './AviaryHandler';
import Button from './Button';
import Secrets from '../../Secrets.json';
import Message from './Message';
import $ from './Helper';


class ButtonHandler {

  static addChooseButton() {
    let button = new Button('choose', 'photo');

    button.addEventListener('click', () => {
      filepicker.setKey(Secrets.Filepicker);
      filepicker.pick(
        {
          mimetypes: ['image/png', 'image/jpg', 'image/jpeg'],
          services: ['SKYDRIVE', 'COMPUTER', 'GOOGLE_DRIVE', 'DROPBOX','FLICKR', 'WEBCAM'],
          language: 'en'
        },
        function onSuccess(blob) {
          ButtonHandler.removeButtons();
          // Save mimetype for later use.
          ButtonHandler.imageMimetype = blob.mimetype;
          // Show image and add edit button.
          $('dropzone').style.backgroundImage = 'url('+blob.url+')';
          $('image-preview').setAttribute('src', `${blob.url}`);
          ButtonHandler.addEditButton(blob.url);
          AviaryHandler.instantiateFeather(); // TODO: Make better solution.
        },
        function onError(fpError) {
          console.log(fpError);
          Message.show(fpError.toString(), 'user-message-error');
        }
      );
    });
    $('choose-button-field').appendChild(button);
  }

  static addSaveButton(url) {
    let button = new Button('save');
    let buttonField = $('save-button-field');
    buttonField.appendChild(button);
    button.addEventListener('click', () => {
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
  }

  static addEditButton(url) {
    let button = new Button('edit');
    let buttonField = $('edit-button-field');
    buttonField.appendChild(button);
    button.addEventListener('click', () => {
      AviaryHandler.launchEditor('image-preview', `${url}`);
    });
	}

	static removeButtons() {
    const editButton = $('edit-button');
    const saveButton = $('save-button');
    if (editButton) editButton.remove();
    if (saveButton) saveButton.remove();
  }

}

export default ButtonHandler;