import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
  }

  open(evt) {
    this._popupElement.querySelector('.popup__img').src = evt.target.src;
    this._popupElement.querySelector('.popup__img').alt = evt.target.alt;
    this._popupElement.querySelector('.popup__figcaption').textContent = evt.target.alt;
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleOverlayClose);
  }
}
