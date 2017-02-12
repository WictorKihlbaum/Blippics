import ActionButtons from './ActionButtons';
import Keys from '../../API_Keys.json';

class AviaryHandler {

	static instantiateFeather() {
		// Instantiate Aviary editor.
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
				this.newURL = newURL;
        // Show the new edited image.
				$('#' + imageID).attr('src', newURL);
        this.handleButtons(imageID, newURL);
        this.feather.close();
			},

			onClose: userHasSaved => {
				if (userHasSaved && !window.location.href.endsWith('google-drive')) {
          ActionButtons.addEditButton(this.newURL);
				}
			},

			onError: errorObj => {
				Message.show(errorObj.message, 'user-message-error');
			}
		});
	}

	static handleButtons(id, url) {
    // Add action buttons for new image.
    const browserURL = window.location.href;
    switch (true) {

      case browserURL.endsWith('local'):
        ActionButtons.addDownloadButton(url);
        break;

      case browserURL.endsWith('dropbox'):
        ActionButtons.addButtons(url);
        break;

      case browserURL.endsWith('onedrive'):
        ActionButtons.addButtons(url);
        break;

      case browserURL.endsWith('google-drive'):
        GoogleDriveHandler.addActionButtons(id, url);
        break;

      default: break;
    }
	}

	static launchEditor(id, src) {
	  this.feather.launch({ image: id, url: src });
		return false;
	}

}

export default AviaryHandler;