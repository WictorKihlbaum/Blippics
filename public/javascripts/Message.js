
class Message {

	static show(message, id) {
		let messageField = document.getElementById('user-message-field');
		messageField.innerHTML = `
			<div id="${id}" class="user-message animated flash">
        ${message} ${this.getCloseButton()}
			</div>
		`;
		let closeButton = document.getElementById('close-message-button');
		closeButton.addEventListener('click', () => {
      document.getElementById('user-message-field').innerHTML = '';
		});
	}

	static getCloseButton() {
		return `
      <i class="material-icons"
			   id="close-message-button"
			   title="Close message"
				 aria-label="Close message">
        close
			</i>
		`;
	}

}

export default Message;