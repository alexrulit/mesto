export default class Card {
  constructor(cardElements, templateSelector, handleCardClick) {
    this._cardTemplate = document.querySelector(templateSelector).content;
    this._cardName = cardElements.name;
    this._cardImgUrl = cardElements.link;
    this._handleCardClick = handleCardClick;
  }

  _deleteCard(evt) {
    this._removeButton = evt.target;
    this._listCard = this._removeButton.closest('.elements__item');
    this._listCard.remove();
  }

  _like(evt) {
    this._likeButton = evt.target;
    this._likeButton.classList.toggle('elements__like-button_active');
  }

  _getCardTemplate() {
    this._cardItem = this._cardTemplate.cloneNode(true);
    this._cardTplImage = this._cardItem.querySelector('.elements__image');
    this._cardTplName = this._cardItem.querySelector('.elements__text');
    this._cardTplLikeButton = this._cardItem.querySelector('.elements__like-button');
    this._cardTplDeleteButton = this._cardItem.querySelector('.elements__delete-button');
  }

  _setCardData() {
    this._cardTplImage.src = this._cardImgUrl;
    this._cardTplImage.alt = this._cardName;
    this._cardTplName.textContent = this._cardName;
  }

  _setCardListeners() {
    this._cardTplImage.addEventListener('click', this._handleCardClick);
    this._cardTplDeleteButton.addEventListener('click', this._deleteCard);
    this._cardTplLikeButton.addEventListener('click', this._like);
  }

  renderCard() {
    this._getCardTemplate();
    this._setCardData();
    this._setCardListeners();

    return this._cardItem;
  }

}
