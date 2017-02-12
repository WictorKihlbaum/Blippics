import $ from 'jquery';

class Message {

	static show(message, id) {
    $('#user-message-field').html(`
      <div id="${id}" class="user-message animated flash">
        ${message} ${this.getCloseButton()}
			</div>
		`);
		$('#close-message-button').click(() => {
			this.remove();
		});
	}

	static remove() {
    $('#user-message-field').html('');
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