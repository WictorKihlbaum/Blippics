import ButtonHandler from './ButtonHandler';
import Secrets from '../../Secrets.json';
import $ from 'jquery';


class AviaryHandler {

	static initiateEditor() {
    this.editor = new Aviary.Feather({
      apiKey: Secrets.Aviary,
      theme: 'minimum',
      tools: 'all',
      appendTo: '',
      displayImageSize: true,
      showWaitIndicator: true,
      launchDelay: 500,
      closeDelay: 500,

      onSave: (imageID, newURL) => {
        this.newURL = newURL; // Save url for onClose().
        $('#image-preview').attr('src', `${newURL}`);
        this.editor.close();
      },
      onClose: imageIsSaved => {
        if (imageIsSaved) {
          // Remove old edit button and add the new one.
          $('#edit-button').remove();
          ButtonHandler.addEditButton(this.newURL);
          ButtonHandler.addSaveButton(this.newURL);
        }
      },
      onError: error => {
        // TODO: Show message for user.
        console.log(error);
      }
    });
	}

  static launchEditor(id, src) {
	  this.editor.launch({ image: id, url: src });
		return false;
	}

}

export default AviaryHandler;