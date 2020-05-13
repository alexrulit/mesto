let popupProfile = document.querySelector('.popup-profile');
let popupAddCard = document.querySelector('.popup-addcard');
let popupImageView = document.querySelector('.popup-image');
const edit = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupProfileButton = popupProfile.querySelector('.popup__close');
const popupAddCardButton = popupAddCard.querySelector('.popup__close');
const popupImageButton = popupImageView.querySelector('.popup__close');
let popupImageLink = popupImageView.querySelector('.popup__img');
let popupImageCaption = popupImageView.querySelector('.popup__figcaption');
let author = document.querySelector('.profile__title');
let desc = document.querySelector('.profile__subtitle');
let popupAuthor = document.querySelector('input[name="popupAuthor"]');
let popupDesc = document.querySelector('input[name="popupDesc"]');
const cardName = document.querySelector('input[name="popupName"]');
const cardLink = document.querySelector('input[name="popupLink"]');
const formProfile = popupProfile.querySelector('.popup__container');
const formAddCard = popupAddCard.querySelector('.popup__container');
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function popupOpen(popup) {
  popup.classList.remove('popup_type_closed');
  popup.classList.add('popup_type_opened');
}

function popupClose(popup) {
  popup.classList.remove('popup_type_opened');
  popup.classList.add('popup_type_closed');
}

function addCard(name, link, position) {
  const cardTemplate = document.querySelector('#fotoCard').content;
  const cardList = document.querySelector('.elements__list');
  const cardItem = cardTemplate.cloneNode(true);

  cardItem.querySelector('.elements__image').src = link;
  cardItem.querySelector('.elements__image').alt = name;
  cardItem.querySelector('.elements__text').textContent = name;

  cardItem.querySelector('.elements__image').addEventListener('click', function(){
    popupImageLink.src = link;
    popupImageLink.alt = name;
    popupImageCaption.textContent = name;
    popupOpen(popupImageView);
  });

  cardItem.querySelector('.elements__delete-button').addEventListener('click', function(evt){
    const rmButton = evt.target;
    const listCard = rmButton.closest('.elements__item');
    listCard.remove();
  });

  cardItem.querySelector('.elements__like-button').addEventListener('click', function(evt){
    let likeButton = evt.target;
    likeButton.classList.toggle('elements__like-button_active');
  });

  position === 'prepend' ? cardList.prepend(cardItem) : cardList.append(cardItem);
}

function renderCards(cards) {
  cards.forEach(item => {
    addCard(item.name, item.link, 'append');
  });
}

function authorEdit() {
  popupAuthor.value = author.textContent;
  popupDesc.value = desc.textContent;
  popupOpen(popupProfile);
}

function formSubmitProfile (evt) {
  evt.preventDefault();

  author.textContent = popupAuthor.value;
  desc.textContent = popupDesc.value;

  popupClose(popupProfile);
}

function formSubmitAddCard (evt) {
  evt.preventDefault();

  addCard(cardName.value, cardLink.value, 'prepend');

  popupClose(popupAddCard);
}

renderCards(initialCards);
formProfile.addEventListener('submit', formSubmitProfile);
formAddCard.addEventListener('submit', formSubmitAddCard);
edit.addEventListener('click', authorEdit);
popupProfileButton.addEventListener('click', function() { popupClose(popupProfile) });
addCardButton.addEventListener('click', function () { popupOpen(popupAddCard) });
popupAddCardButton.addEventListener('click', function() { popupClose(popupAddCard) });
popupImageButton.addEventListener('click', function() { popupClose(popupImageView) });
