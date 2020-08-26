export default class Popup {
  constructor(popupSelector){
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);
    this._popupCloseButton = this._popupElement.querySelector('.popup__close');
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._popupSubmitButton = this._popupElement.querySelector('.popup__submit');
    this._popupCloseButton = this._popupElement.querySelector('.popup__close');
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleOverlayClose);
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if(evt.target === this._popupElement) {
      this.close();
    }
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._handleOverlayClose);
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', this.close);
  }

  setButtonText(text, isActive) {
    this._popupSubmitButton.textContent = text;
    this._popupSubmitButton.disabled = isActive;
  }
}
