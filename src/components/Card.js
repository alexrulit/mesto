export default class Card {
  constructor(cardElements, templateSelector, handleCardClick, handleCardLike, handleCardDelete, userId) {
    this._cardTemplate = document.querySelector(templateSelector).content;
    this._cardId = cardElements._id;
    this._cardName = cardElements.name;
    this._cardImgUrl = cardElements.link;
    this._cardOwnerId = cardElements.owner._id;
    this._cardLikes = cardElements.likes;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
  }

  _getCardTemplate() {
    this._cardItem = this._cardTemplate.cloneNode(true);
    this._cardTplImage = this._cardItem.querySelector('.elements__image');
    this._cardTplName = this._cardItem.querySelector('.elements__text');
    this._cardTplLikeButton = this._cardItem.querySelector('.elements__like-button');
    this._cardTplDeleteButton = this._cardItem.querySelector('.elements__delete-button');
    this._cardTplLikeCount = this._cardItem.querySelector('.elements__like-count');
  }

  _setCardData() {
    this._cardTplImage.src = this._cardImgUrl;
    this._cardTplImage.alt = this._cardName;
    this._cardTplName.textContent = this._cardName;
    this._cardTplLikeCount.textContent = this._cardLikes.length;
  }

  _setCardListeners() {
    this._cardTplImage.addEventListener('click', this._handleCardClick);
    this._cardTplDeleteButton.addEventListener('click', (evt) => { this._handleCardDelete(evt, this._cardId); });
    this._cardTplLikeButton.addEventListener('click', (evt) => { this._handleCardLike(evt, this._cardId); });
  }

  _checkIsLiked() {
    this._cardLikes.forEach(item => {
      if(item._id === this._userId) {
        this._cardTplLikeButton.classList.add('elements__like-button_active');
      }
    })
  }

  _checkOwner() {
    if(this._cardOwnerId !== this._userId) {
      this._cardTplDeleteButton.disabled = true;
      this._cardTplDeleteButton.style.visibility = 'hidden';
    }
  }

  renderCard() {
    this._getCardTemplate();
    this._setCardData();
    this._setCardListeners();
    this._checkOwner();
    this._checkIsLiked();

    return this._cardItem;
  }

}
