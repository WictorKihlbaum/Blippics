import $ from 'jquery';

export default function createButton(type, icon = type) {
  let button = $('<button></button>');
  button.addClass('mdl-button mdl-js-button mdl-button--fab mdl-button--primary');
  button.attr('id', `${type}-button`);
  button.attr('title', `${type} image`);
  button.attr('aria-label', `${type} image`);
  button.html(`<i class="material-icons">${icon}</i>`);
  return button;
};