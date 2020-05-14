const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_addcard');
const popupImageView = document.querySelector('.popup_type_image');
const edit = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupProfileButton = popupProfile.querySelector('.popup__close');
const popupAddCardButton = popupAddCard.querySelector('.popup__close');
const popupImageButton = popupImageView.querySelector('.popup__close');
const popupImageLink = popupImageView.querySelector('.popup__img');
const popupImageCaption = popupImageView.querySelector('.popup__figcaption');
const author = document.querySelector('.profile__title');
const desc = document.querySelector('.profile__subtitle');
const popupAuthor = document.querySelector('input[name="popupAuthor"]');
const popupDesc = document.querySelector('input[name="popupDesc"]');
const cardName = document.querySelector('input[name="popupName"]');
const cardLink = document.querySelector('input[name="popupLink"]');
const formProfile = popupProfile.querySelector('.popup__container');
const formAddCard = popupAddCard.querySelector('.popup__container');
const cardTemplate = document.querySelector('#fotoCard').content;
const cardList = document.querySelector('.elements__list');
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

function popup(popup) {
  popup.classList.toggle('popup_opened');
}

function imageView(name, link) {
  popupImageLink.src = link;
  popupImageLink.alt = name;
  popupImageCaption.textContent = name;
  popup(popupImageView);
}

function deleteCard(evt) {
  const rmButton = evt.target;
  const listCard = rmButton.closest('.elements__item');
  listCard.remove();
}

function like(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle('elements__like-button_active');
}

function addCard(name, link) {
  const cardItem = cardTemplate.cloneNode(true);

  cardItem.querySelector('.elements__image').src = link;
  cardItem.querySelector('.elements__image').alt = name;
  cardItem.querySelector('.elements__text').textContent = name;
  cardItem.querySelector('.elements__image').addEventListener('click', function(){ imageView(name, link) });
  cardItem.querySelector('.elements__delete-button').addEventListener('click', deleteCard);
  cardItem.querySelector('.elements__like-button').addEventListener('click', like);

  return cardItem;
}

function renderCards(cards) {
  cards.forEach(item => {
    cardList.append(addCard(item.name, item.link));
  });
}

function authorEdit() {
  popupAuthor.value = author.textContent;
  popupDesc.value = desc.textContent;
  popup(popupProfile);
}

function formSubmitProfile (evt) {
  evt.preventDefault();

  author.textContent = popupAuthor.value;
  desc.textContent = popupDesc.value;

  popup(popupProfile);
}

function formSubmitAddCard (evt) {
  evt.preventDefault();

  cardList.prepend(addCard(cardName.value, cardLink.value));

  popup(popupAddCard);
}

renderCards(initialCards);
formProfile.addEventListener('submit', formSubmitProfile);
formAddCard.addEventListener('submit', formSubmitAddCard);
edit.addEventListener('click', authorEdit);
popupProfileButton.addEventListener('click', () => { popup(popupProfile) });
addCardButton.addEventListener('click', () => { popup(popupAddCard) });
popupAddCardButton.addEventListener('click', () => { popup(popupAddCard) });
popupImageButton.addEventListener('click', () => { popup(popupImageView) });
