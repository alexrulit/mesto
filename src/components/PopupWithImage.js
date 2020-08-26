import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
  }

  open(src, alt) {
    this._popupImage = this._popupElement.querySelector('.popup__img');
    this._popupFigure = this._popupElement.querySelector('.popup__figcaption');
    this._popupImage.src = src;
    this._popupImage.alt = alt;
    this._popupFigure.textContent = alt;
    super.open();
  }
}
