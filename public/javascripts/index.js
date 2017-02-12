import LocalHandler from './LocalHandler';
import DropboxHandler from './DropboxHandler';
import OneDriveHandler from './OneDriveHandler';
import AviaryHandler from './AviaryHandler';
import SelfieHandler from './SelfieHandler';


// TODO: Change the name "ActionButtons" to "ButtonHandler".

const url = window.location.href;

switch (true) {

  case url.endsWith('local'):
    LocalHandler.init();
    AviaryHandler.instantiateFeather();
    break;

  case url.endsWith('dropbox'):
    DropboxHandler.addClickEvent();
    AviaryHandler.instantiateFeather();
    break;

  case url.endsWith('onedrive'):
    OneDriveHandler.addClickEvent();
    AviaryHandler.instantiateFeather();
    break;

  case url.endsWith('selfie'):
    SelfieHandler.init();
    break;

  default: break;
}