import Message from '../Message';
import ActionButtons from '../ButtonHandler';
import Messages from '../../../Messages.json';


class LocalHandler {

	static init() {
  	this.preview = $('#editable-image');
  	this.defaultImagePath = '/images/placeholder_image.png';
		this.setupDroparea();
	}

	static setupDroparea() {
    let dropArea = $("#dropzone");
    let fileInput = $('#input');
		// Prevent defaults on drag/drop events.
		dropArea.on('drag dragstart dragend dragover dragenter dragleave drop', e => {
			if (e.preventDefault) e.preventDefault();
			if (e.stopPropagation) e.stopPropagation();
		})
		.on('click', e => {
			// Click anywhere in Droparea to upload file.
		  fileInput.click();
		})
		.on('dragover', e => {
			dropArea.css('background-color', '#E4F1FE');
		})
		.on('dragleave', e => {
			dropArea.css('background-color', 'white');
		})
		.on('drop', e => {
			dropArea.css('background-color', 'white');
			// Get the dropped file.
			const file = e.originalEvent.dataTransfer.files[0];
			this.handleFile(file);
		});
		// Takes file from file chooser.
		fileInput.on('change', e => {
			const file = e.originalEvent.target.files[0];
			if (file) this.handleFile(file);
		});
	}

	static handleFile(file) {
		if (this.isValidImageFormat(file)) {
			// In case an earlier message has been shown.
			Message.remove();
			ActionButtons.removeButtons();

			if (file) {
				this.createFileReader(file);
			} else {
				this.resetPreview();
				ActionButtons.removeButtons();
			}
		} else {
			const message = Messages.Local.error.invalidFile;
			Message.show(message, 'user-message-error');
			this.resetPreview();
			ActionButtons.removeButtons();
		}
	}

	static createFileReader(file) {
		const reader = new FileReader();
		reader.onload = () => {
			this.hideSpinner();
			this.updatePreview(reader.result);
			ActionButtons.addEditButton(reader.result);
		};
		reader.onprogress = () => {
			this.showSpinner();
		};
		reader.onerror = error => {
			Message.show(error, 'user-message-error');
		};
		reader.readAsDataURL(file);
	}

	static isValidImageFormat(file) {
		// Adobe Aviary photo editor only supports Png and Jpg/Jpeg.
		return ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type);
	}

	static updatePreview(result) {
		this.preview.attr('src', result);
	}

	static resetPreview() {
		this.preview.attr('src', this.defaultImagePath);
	}

	static showSpinner() {
		$('.spinner').removeClass('is-hidden');
	}

	static hideSpinner() {
		$('.spinner').addClass('is-hidden');
	}

}

export default LocalHandler;