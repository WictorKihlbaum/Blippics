import LocalHandler from './LocalHandler.js';
import DropboxHandler from './DropboxHandler.js';
import OneDriveHandler from './OneDriveHandler.js';
import AviaryHandler from './AviaryHandler.js';
import SelfieHandler from './SelfieHandler.js';


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