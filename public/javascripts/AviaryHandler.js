import ActionButtons from './ActionButtons.js';

class AviaryHandler {

	static instantiateFeather() {
		// Instantiate Aviary editor.
		this.feather = new Aviary.Feather({
			apiKey: 'eb5f4fca52634bbf94da9389bd974012',
			theme: 'minimum',
			tools: 'all',
			appendTo: '',
			displayImageSize: true,
			showWaitIndicator: true,
			launchDelay: 500,
			closeDelay: 500,

			onSave: (imageID, newURL) => {
				this.newURL = newURL;
        // Show the new edited image.
				$('#' + imageID).attr('src', newURL);
        this.handleButtons(imageID, newURL);
        this.feather.close();
			},

			onClose: userHasSaved => {
				if (userHasSaved && !window.location.href.includes('google-drive')) {
          ActionButtons.addEditButton(this.newURL);
				}
			},

			onError: errorObj => {
				const message = errorObj.message;
				Message.show(message, 'user-message-error');
			}
		});
	}

	static handleButtons(id, url) {
    const location = window.location.href;
    if (location.includes('dropbox')) {
      ActionButtons.addButtons(url);
		}

		// Add action buttons for new image.
		/*switch (true) {
			case location.includes('google-drive'):
				GoogleDriveHandler.addActionButtons(id, url);
				break;
			case location.includes('local'):
				ActionButtons.addDownloadButton(url);
				break;
      case location.includes('dropbox'):
        ActionButtons.addButtons(url);
        break;
			default: ActionButtons.addButtons(url);
		}*/
	}

	static launchEditor(id, src) {
	  this.feather.launch({ image: id, url: src });
		return false;
	}

};

module.onload = AviaryHandler.instantiateFeather();
export default AviaryHandler;