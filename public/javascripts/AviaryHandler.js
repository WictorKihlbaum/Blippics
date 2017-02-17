import ButtonHandler from './ButtonHandler';
import Secrets from '../../Secrets.json';
import $ from 'jquery';


class AviaryHandler {

	static instantiateFeather() {
    // Instantiate editor.
    this.feather = new Aviary.Feather({
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
        this.feather.close();
      },
      onClose: userHasSaved => {
        if (userHasSaved) {
          $('#edit-button').remove();
          ButtonHandler.addEditButton(this.newURL);
          ButtonHandler.addSaveButton(this.newURL);
        }
      },
      onError: error => {
        console.log(error);
      }
    });
	}

  static launchEditor(id, src) {
	  this.feather.launch({ image: id, url: src });
		return false;
	}

}

export default AviaryHandler;