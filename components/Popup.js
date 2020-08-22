export default class Popup {
  constructor(popupSelector){
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);
  }

  open = () => {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleOverlayClose);

  }

  close = () => {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._handleOverlayClose);
  }

  _handleEscClose = (evt) => {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose = (evt) => {
    if(evt.target === this._popupElement) {
      this.close();
    }
  }

  setEventListeners = () => {
    this._popupCloseButton = this._popupElement.querySelector('.popup__close');
    this._popupCloseButton.addEventListener('click', this.close);
  }
}
