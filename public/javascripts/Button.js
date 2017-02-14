export default function createButton(type, icon = type) {
  let button = document.createElement('button');
  button.setAttribute('class', 'mdl-button mdl-js-button mdl-button--fab mdl-button--primary animated bounceIn');
  button.setAttribute('id', `${type}-button`);
  button.setAttribute('title', `${type} image`);
  button.setAttribute('aria-label', `${type} image`);
  button.innerHTML = `<i class="material-icons">${icon}</i>`;
  return button;
};