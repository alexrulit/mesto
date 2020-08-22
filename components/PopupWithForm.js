import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitHandler }){
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  _getInputValues = () => {
    this._inputList = this._popupElement.querySelectorAll('.popup__input');
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close = () => {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._handleOverlayClose);
    this._popupElement.querySelector('.popup__container').reset();
  }

  setEventListeners = () => {
    this._popupCloseButton = this._popupElement.querySelector('.popup__close');
    this._popupCloseButton.addEventListener('click', this.close);
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._submitHandler(this._getInputValues());

      this.close();
    });
  }
}
