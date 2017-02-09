import $ from 'jquery';

class Message {

	static init() {
		this.field = $('#user-message-field');
	}

	static show(message, id) {
		this.field.html(`
      <div id="${id}" class="user-message animated flash">
        ${message} ${this.getCloseButton()}
			</div>
		`);
		$('#close-message-button').click(() => {
			this.remove();
		});
	}

	static remove() {
	  this.field.html('');
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

module.onload = Message.init();
export default Message;