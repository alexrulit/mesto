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
const cardTemplate = document.querySelector('#fotoCard').content;
const cardList = document.querySelector('.elements__list');
const escapeName = 'Escape';
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

const imageView = (name, link) => {
  popupImageLink.src = link;
  popupImageLink.alt = name;
  popupImageCaption.textContent = name;
  popup(popupImageView, true);
}

const deleteCard = (evt) => {
  const rmButton = evt.target;
  const listCard = rmButton.closest('.elements__item');
  listCard.remove();
}

const like = (evt) => {
  const likeButton = evt.target;
  likeButton.classList.toggle('elements__like-button_active');
}

const makeCardElement = (name, link) => {
  const cardItem = cardTemplate.cloneNode(true);
  const cardImage = cardItem.querySelector('.elements__image');
  const cardName = cardItem.querySelector('.elements__text');
  const cardLikeButton = cardItem.querySelector('.elements__like-button');
  const cardDeleteButton = cardItem.querySelector('.elements__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;
  cardImage.addEventListener('click', function(){ imageView(name, link) });
  cardDeleteButton.addEventListener('click', deleteCard);
  cardLikeButton.addEventListener('click', like);

  return cardItem;
}

const renderCards = (cards) => {
  cards.forEach(item => {
    cardList.append(makeCardElement(item.name, item.link));
  });
}

const authorEdit = () => {
  popupAuthor.value = author.textContent;
  popupDesc.value = desc.textContent;
  popup(popupProfile, true);
}

const formSubmitProfile = (evt) => {
  evt.preventDefault();

  author.textContent = popupAuthor.value;
  desc.textContent = popupDesc.value;

  popup(popupProfile, false);
}

const formSubmitAddCard = (evt) => {
  evt.preventDefault();

  cardList.prepend(makeCardElement(cardName.value, cardLink.value));

  popup(popupAddCard, false);
}

renderCards(initialCards);
formProfile.addEventListener('submit', formSubmitProfile);
formAddCard.addEventListener('submit', formSubmitAddCard);
edit.addEventListener('click', authorEdit);
profileCloseButton.addEventListener('click', () => { popup(popupProfile, false) });
addCardButton.addEventListener('click', () => { popup(popupAddCard, true) });
addCardCloseButton.addEventListener('click', () => { popup(popupAddCard, false) });
imageCloseButton.addEventListener('click', () => { popup(popupImageView, false) });
