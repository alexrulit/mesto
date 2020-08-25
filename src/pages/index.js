import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileAvatarButton = document.querySelector('.profile__avatar-link');
const popupAuthor = document.querySelector('input[name="popupAuthor"]');
const popupDesc = document.querySelector('input[name="popupDesc"]');
const popupAvatarLink = document.querySelector('input[name="avatarLink"]');
const apiParams = {
  token: '67d49140-f28d-4665-8757-80e700844f4c',
  groupId: 'cohort-14',
  contentType: 'application/json'
};
const mainParams = {
  popupProfileSelector: '.popup_type_profile',
  popupAddCardSelector: '.popup_type_addcard',
  popupImageSelector: '.popup_type_image',
  popupDeleteSelector: '.popup_type_delete',
  popupAvatarSelector: '.popup_type_avatar',
  profileAuthorSelector: '.profile__title',
  profileDescSelector: '.profile__subtitle',
  profileAvatarSelector: '.profile__avatar',
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
let cardsList;

const userInfo = new UserInfo(mainParams.profileAuthorSelector, mainParams.profileDescSelector, mainParams.profileAvatarSelector);

const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/${apiParams.groupId}`,
  headers: {
    authorization: apiParams.token,
    contentType: apiParams.contentType
  }
});

api.getUserInfo()
  .then((result) => {
    userInfo.setUserInfo(result.name, result.about);
    userInfo.setUserAvatar(result.avatar);
    userInfo.setUserId(result._id);
  })
  .then(() => {
    api.getInitialCards()
    .then(data => {
      renderInitialCards(data, userInfo.getUserId());
    })
    .catch((err) => {
      console.log(err);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const viewImage = (evt) => {
  const imagePopup = new PopupWithImage(mainParams.popupImageSelector);
  imagePopup.open(evt);
  imagePopup.setEventListeners();
}

const cardLike = (evt, cardId) => {
  const likeButton = evt.target;
  const state = likeButton.classList.contains('elements__like-button_active');
  api.cardLike(cardId, state)
    .then(result => {
      likeButton.nextElementSibling.textContent = result.likes.length;
      likeButton.classList.toggle('elements__like-button_active', !state);
    })
    .catch((err) => {
      console.log(err);
    });
}

const cardDelete = (evt, cardId) => {
  const popupDeleteCard = new PopupWithForm(mainParams.popupDeleteSelector,{
    submitHandler: () => {
      const deleteButton = evt.target;
      const deleteCardElement = deleteButton.closest('.elements__item');
      api.deleteCard(cardId)
        .then(() => {
          deleteCardElement.remove();
          popupDeleteCard.close();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  popupDeleteCard.setEventListeners();
  popupDeleteCard.open();
}

const renderInitialCards = (initialCards, userId) => {
  cardsList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem, mainParams.cardTplSelector, viewImage, cardLike, cardDelete, userId);
      const cardElement = card.renderCard();
      cardsList.setItem(cardElement);
    }
  }, mainParams.cardListSection);

  cardsList.renderItems();
};


const popupProfile = new PopupWithForm(mainParams.popupProfileSelector, {
    submitHandler: (item) => {
      requestLoading(true, popupProfile);
      api.setUserInfo(item.popupAuthor, item.popupDesc)
        .then(result => {
          userInfo.setUserInfo(result.name, result.about);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupProfile.close();
          requestLoading(false, popupProfile);
        });
    }
});

popupProfile.setEventListeners();

const popupAddCard = new PopupWithForm(mainParams.popupAddCardSelector, {
    submitHandler: (item) => {
      requestLoading(true, popupAddCard);
      api.addNewCard(item.name, item.link)
      .then(result => {
        const newCard = new Card(result, mainParams.cardTplSelector, viewImage, cardLike, cardDelete, userInfo.getUserId());
        const newCardElement = newCard.renderCard();
        cardsList.setPrependItem(newCardElement);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddCard.close();
        requestLoading(false, popupAddCard);
      });
    }
});

popupAddCard.setEventListeners();

const editAuthor = () => {
  const user = userInfo.getUserInfo();
  popupAuthor.value = user.author;
  popupDesc.value = user.description;
  popupProfile.open();
}

const popupAvatar = new PopupWithForm(mainParams.popupAvatarSelector, {
  submitHandler: (item) => {
    requestLoading(true, popupAvatar);
    api.setAvatar(item.avatarLink)
      .then(result => {
        userInfo.setUserAvatar(result.avatar);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatar.close();
        requestLoading(false, popupAvatar);
      });
  }
});

popupAvatar.setEventListeners();

const editAvatar = () => {
  const avatar = userInfo.getUserAvatar();
  popupAvatarLink.value = avatar;
  popupAvatar.open();
}

const requestLoading = (isLoading, popupElement) => {
  if(isLoading) {
    popupElement.setButtonText('Сохранение...', isLoading);
  } else {
    popupElement.setButtonText('Сохранить', isLoading);
  }
};

const setValidation = (params) => {

  const formElements = Array.from(document.querySelectorAll(params.formSelector));

  formElements.forEach((formElement) => {
      const formValid = new FormValidator(params, formElement);
      formValid.enableValidation();
  });
};

setValidation(validationParams);
profileEditButton.addEventListener('click', editAuthor);
addCardButton.addEventListener('click', () => { popupAddCard.open(); });
profileAvatarButton.addEventListener('click', editAvatar);
