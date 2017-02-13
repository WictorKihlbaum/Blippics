import $ from 'jquery';
import ActionButtons from '../ButtonHandler';
import Secrets from '../../../Secrets.json';

class GooglePickerHandler {

  static init() {
    this.developerKey = Secrets.Google.developerKey;
    this.clientId = Secrets.Google.clientId;
    this.appId = Secrets.Google.appId;
    this.scope = ['https://www.googleapis.com/auth/drive'];
    this.pickerApiLoaded = false;
    this.oauthToken = null;
  }

  static addClickEvent() {
    $('#choose-button').click(() => {
      this.loadPicker();
    });
  }

  /*
   * Use the Google API Loader script to load the google.picker script.
   */
  static loadPicker() {
    gapi.load('auth', {'callback': this.onAuthApiLoad});
    gapi.load('picker', {'callback': this.onPickerApiLoad});
  }

  static onAuthApiLoad() {
    const self = GooglePickerHandler;
    window.gapi.auth.authorize(
      {
        'client_id': self.clientId,
        'scope': self.scope,
        'immediate': false
      },
      self.handleAuthResult
    );
  }

  static onPickerApiLoad() {
    const self = GooglePickerHandler;
    self.pickerApiLoaded = true;
    self.createPicker();
  }

  static handleAuthResult(authResult) {
    const self = GooglePickerHandler;
    if (authResult && !authResult.error) {
      self.oauthToken = authResult.access_token;
      self.createPicker();
    }
  }

  /*
   * Create and render a Picker object for searching images.
   */
  static createPicker() {
    const self = GooglePickerHandler;
    if (self.pickerApiLoaded && self.oauthToken) {
      let view = new google.picker.View(google.picker.ViewId.DOCS);
      view.setMimeTypes("image/png,image/jpeg,image/jpg");
      let picker = new google.picker.PickerBuilder()
        .enableFeature(google.picker.Feature.NAV_HIDDEN)
        .setAppId(self.appId)
        .setOAuthToken(self.oauthToken)
        .addView(view)
        //.addView(new google.picker.DocsUploadView())
        .setDeveloperKey(self.developerKey)
        .setCallback(self.pickerCallback)
        .build();
      picker.setVisible(true);
    }
  }

  /*
   * A simple callback implementation.
   */
  static pickerCallback(data) {
    if (data.action == google.picker.Action.PICKED) {
      console.log(data);
      const imageUrl = data.docs[0].embedUrl;
      let fileUrl = data.docs[0].url;
      //$('#editable-image').attr('src', imageUrl);
      //ActionButtons.removeButtons();
      //ActionButtons.addEditButton('');
      //GooglePickerHandler.getImage(fileUrl);
    }
  }

  static getImage(url) {
    const xhr = new XMLHttpRequest();
    const accessToken = gapi.auth.getToken().access_token;

    xhr.onloadend = () => {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };

    xhr.onerror = () => {
      console.log('Something went wrong');
    }

    xhr.open('GET', 'https://drive.google.com/file/d/0BzR5X_i2lIK8UWtmNVhicE9HbVk/view');
    xhr.responseType = 'blob';
    xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
    xhr.send();
  }

}

export default GooglePickerHandler;