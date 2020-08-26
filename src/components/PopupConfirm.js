import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, { submitHandler }){
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  open(cardItem, cardId) {
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(cardItem, cardId);
    });

    super.open();
  }
}
