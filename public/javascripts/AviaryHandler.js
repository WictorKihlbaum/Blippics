import ButtonHandler from './ButtonHandler';
import Secrets from '../../Secrets.json';
import Message from './Message';
import ID from './Helper';


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
				this.newURL = newURL; // Save url for use in onClose().
        ID('dropzone').style.backgroundImage = 'url('+newURL+')';
        ID('image-preview').setAttribute('src', `${newURL}`);
        this.feather.close();
			},
			onClose: userHasSaved => {
				if (userHasSaved) {
          ID('edit-button').remove();
				  // Update edit button and add save button.
          ButtonHandler.addEditButton(this.newURL);
          ButtonHandler.addSaveButton(this.newURL);
				}
			},
			onError: error => {
				Message.show(error.message, 'user-message-error');
			}
		});
	}

	static launchEditor(id, src) {
	  this.feather.launch({ image: id, url: src });
		return false;
	}

}

export default AviaryHandler;