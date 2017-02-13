import $ from 'jquery';
import ActionButtons from '../ButtonHandler';
import Message from '../Message';
import Toast from './Toast';
import Keys from '../../../API_Keys.json';
import Messages from '../../../Messages.json';

class OneDriveHandler {

  // TODO: Validate file type (extension) for choosen file.
  // Microsoft doesn't give this functionality in their API.
  // Keep updated on this!

  static launchOneDrivePicker() {
    const odOptions = {
      clientId: Keys.OneDrive,
      action: "download",
      success: files => {
        const url = files.value[0]['@microsoft.graph.downloadUrl'];
        $('#editable-image').attr('src', url);
        ActionButtons.removeButtons();
        ActionButtons.addEditButton(url);
      },
      error: e => {
        Message.show(e, 'user-message-error');
      }
    };
    OneDrive.open(odOptions);
  }

  static launchOneDriveSaver(url) {
    const odOptions = {
      clientId: Keys.OneDrive,
      action: "save",
      sourceUri: url,
      fileName: "testImage.png", // TODO: Don't hard code this.
      openInNewWindow: true,
      success: files => {
        Toast.showSuccess(Messages.OneDrive.success.upload);
        $('.spinner').addClass('is-hidden');
        ActionButtons.reStyleSaveButton();
      },
      progress: progress => {
        $('.spinner').removeClass('is-hidden');
      },
      error: e => {
        Message.show(e, 'user-message-error');
      }
    };
    OneDrive.save(odOptions);
  }

  static addClickEvent() {
    $('#choose-button').click(() => {
      OneDrive.open(this.launchOneDrivePicker());
    });
  }

}

export default OneDriveHandler;