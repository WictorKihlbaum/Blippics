import ButtonHandler from './ButtonHandler';
import Keys from '../../API_Keys.json';
import Message from './Message';


class AviaryHandler {

	static instantiateFeather() {
		// Instantiate editor.
		this.feather = new Aviary.Feather({
			apiKey: Keys.Aviary,
			theme: 'minimum',
			tools: 'all',
			appendTo: '',
			displayImageSize: true,
			showWaitIndicator: true,
			launchDelay: 500,
			closeDelay: 500,

			onSave: (imageID, newURL) => {
				this.newURL = newURL; // Save url for later use.
				$('#' + imageID).attr('src', newURL); // Show the new edited image.
        this.feather.close(); // Close editor.
			},
			onClose: userHasSaved => {
				if (userHasSaved) {
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