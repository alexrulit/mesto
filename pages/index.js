import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupAuthor = document.querySelector('input[name="popupAuthor"]');
const popupDesc = document.querySelector('input[name="popupDesc"]');
const mainParams = {
  popupProfileSelector: '.popup_type_profile',
  popupAddCardSelector: '.popup_type_addcard',
  popupImageSelector: '.popup_type_image',
  profileAuthorSelector: '.profile__title',
  profileDescSelector: '.profile__subtitle',
  cardTplSelector: '#fotoCard',
  cardListSection: '.elements__list'
};
const validationParams = {
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


const viewImage = (evt) => {
  const imagePopup = new PopupWithImage(mainParams.popupImageSelector);
  imagePopup.open(evt);
  imagePopup.setEventListeners();
}

const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem, mainParams.cardTplSelector, viewImage);
    const cardElement = card.renderCard();
    cardsList.setItem(cardElement);
  }
}, mainParams.cardListSection);

cardsList.renderItems();

const userInfo = new UserInfo(mainParams.profileAuthorSelector, mainParams.profileDescSelector);

const popupProfile = new PopupWithForm(mainParams.popupProfileSelector, {
    submitHandler: (item) => {
      userInfo.setUserInfo(item.popupAuthor, item.popupDesc);
    }
});

popupProfile.setEventListeners();

const popupAddCard = new PopupWithForm(mainParams.popupAddCardSelector, {
    submitHandler: (item) => {
      const newCard = new Card(item, mainParams.cardTplSelector, viewImage);
      const newCardElement = newCard.renderCard();
      cardsList.setPrependItem(newCardElement);
    }
});

popupAddCard.setEventListeners();

const editAuthor = () => {
  const user = userInfo.getUserInfo();
  popupAuthor.value = user.author;
  popupDesc.value = user.description;
  popupProfile.open();
}

const setValidation = (params) => {

  const formElements = Array.from(document.querySelectorAll(params.formSelector));

  formElements.forEach((formElement) => {
      const formValid = new FormValidator(params, formElement);
      formValid.enableValidation();
  });
};

setValidation(validationParams);
profileEditButton.addEventListener('click', editAuthor);
addCardButton.addEventListener('click', popupAddCard.open);

