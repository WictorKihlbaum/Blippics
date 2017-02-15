import AviaryHandler from './AviaryHandler';
import Button from './Button';
import Secrets from '../../Secrets.json';
import Message from './Message';
import ID from './Helper';


class ButtonHandler {

  static addChooseButton() {
    const button = new Button('choose', 'photo');
    const self = ButtonHandler;

    button.addEventListener('click', () => {
      filepicker.setKey(Secrets.Filepicker);
      filepicker.pick(
        {
          mimetypes: ['image/png', 'image/jpg', 'image/jpeg'],
          services: ['SKYDRIVE', 'COMPUTER', 'GOOGLE_DRIVE', 'DROPBOX','FLICKR', 'WEBCAM'],
          language: 'en'
        },
        function onSuccess(blob) {
          self.removeButtons();
          // Save mimetype for later use.
          self.imageMimetype = blob.mimetype;
          // Show image and add edit button.
          ID('dropzone').style.backgroundImage = 'url('+blob.url+')';
          ID('image-preview').setAttribute('src', `${blob.url}`);
          self.addEditButton(blob.url);
          AviaryHandler.instantiateFeather(); // TODO: Make better solution.
        },
        function onError(fpError) {
          console.log(fpError);
          Message.show(fpError.toString(), 'user-message-error');
        }
      );
    });
    ID('choose-button-field').appendChild(button);
  }

  static addSaveButton(url) {
    const button = new Button('save');
    const buttonField = ID('save-button-field');
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
    const button = new Button('edit');
    const buttonField = ID('edit-button-field');
    buttonField.appendChild(button);
    button.addEventListener('click', () => {
      AviaryHandler.launchEditor('image-preview', `${url}`);
    });
	}

	static removeButtons() {
    const editButton = ID('edit-button');
    const saveButton = ID('save-button');
    if (editButton) editButton.remove();
    if (saveButton) saveButton.remove();
  }

}

export default ButtonHandler;