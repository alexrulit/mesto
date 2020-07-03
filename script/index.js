const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_addcard');
const popupImageView = document.querySelector('.popup_type_image');
const edit = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileCloseButton = popupProfile.querySelector('.popup__close');
const addCardCloseButton = popupAddCard.querySelector('.popup__close');
const imageCloseButton = popupImageView.querySelector('.popup__close');
const popupImageLink = popupImageView.querySelector('.popup__img');
const popupImageCaption = popupImageView.querySelector('.popup__figcaption');
const allPopups = document.querySelectorAll('.popup');
const author = document.querySelector('.profile__title');
const desc = document.querySelector('.profile__subtitle');
const popupAuthor = document.querySelector('input[name="popupAuthor"]');
const popupDesc = document.querySelector('input[name="popupDesc"]');
const cardName = document.querySelector('input[name="popupName"]');
const cardLink = document.querySelector('input[name="popupLink"]');
const formProfile = popupProfile.querySelector('.popup__container');
const formAddCard = popupAddCard.querySelector('.popup__container');
const cardTplSelector = '#fotoCard';
const cardList = document.querySelector('.elements__list');
const escapeName = 'Escape';
const params = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  formParentSelector: '.popup',
  formInactiveDefault: 'popup_type_addcard'
};
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

import Card from './Card.js';
import FormValidator from './FormValidator.js';





const popup = (popup, action) => {
  popup.classList.toggle('popup_opened', action);
  if (action) {
    document.addEventListener('click', overlay);
    document.addEventListener('keydown', escKey);
  } else {
    document.removeEventListener('click', overlay);
    document.removeEventListener('keydown', escKey);
  }
}

const overlay = (evt) => {
    allPopups.forEach(item => {
      if(evt.target === item) {
        popup(item, false);
      }
    });
}

const escKey = (evt) => {
    allPopups.forEach(item => {
      if(evt.key === escapeName && item.classList.contains('popup_opened')) {
        popup(item, false);
      }
    });
}

export const imageView = (evt) => {
  const image = evt.target;
  popupImageLink.src = image.src;
  popupImageLink.alt = image.alt;
  popupImageCaption.textContent = image.alt;
  popup(popupImageView, true);
}


const newCard = (item) => {
  const card = new Card(item, cardTplSelector);
  return card.renderCard();
}

const renderCards = (cards) => {
  cards.forEach(item => {
    cardList.append(newCard(item));
  });
}

const authorEdit = () => {
  popupAuthor.value = author.textContent;
  popupDesc.value = desc.textContent;
  validateForm(params, popupProfile);
  popup(popupProfile, true);
}

const formSubmitProfile = (evt) => {
  evt.preventDefault();

  author.textContent = popupAuthor.value;
  desc.textContent = popupDesc.value;

  popup(popupProfile, false);
  validateForm(params, popupAddCard);
}

const formSubmitAddCard = (evt) => {
  evt.preventDefault();

  const card = [];
  card.name = cardName.value;
  card.link = cardLink.value;

  cardList.prepend(newCard(card));

  popup(popupAddCard, false);
}

const setValidation = (params) => {

  const formElements = Array.from(document.querySelectorAll(params.formSelector));

  formElements.forEach((formElement) => {
      const formValid = new FormValidator(params, formElement);
      formValid.enableValidation();
  });
};

setValidation(params);
renderCards(initialCards);
formProfile.addEventListener('submit', formSubmitProfile);
formAddCard.addEventListener('submit', formSubmitAddCard);
edit.addEventListener('click', authorEdit);
profileCloseButton.addEventListener('click', () => { popup(popupProfile, false) });
addCardButton.addEventListener('click', () => { popup(popupAddCard, true) });
addCardCloseButton.addEventListener('click', () => { popup(popupAddCard, false) });
imageCloseButton.addEventListener('click', () => { popup(popupImageView, false) });
