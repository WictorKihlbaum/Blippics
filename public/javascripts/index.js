import DropboxHandler from './DropboxHandler.js';
//import AviaryHandler from './AviaryHandler.js';

if (window.location.href.includes('dropbox')) {
  DropboxHandler.addClickEvent();
  //AviaryHandler.instantiateFeather();
}