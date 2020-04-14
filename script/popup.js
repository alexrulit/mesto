let popup = document.querySelector('.popup');
const edit = document.querySelector('.profile__edit-button');
const popupButton = document.querySelector('.popup__close');
let author = document.querySelector('.profile__title');
let desc = document.querySelector('.profile__subtitle');
let popupAuthor = document.querySelector('input[name="popupAuthor"]');
let popupDesc = document.querySelector('input[name="popupDesc"]');
const form = document.querySelector('.popup__container');

function popupOpen() {
  popup.classList.remove('popup_type_closed');
  popupAuthor.value = author.textContent;
  popupDesc.value = desc.textContent;
}

function popupClose() {
  popup.classList.add('popup_type_closed');
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  author.textContent = popupAuthor.value;
  desc.textContent = popupDesc.value;

  popupClose();
}

form.addEventListener('submit', formSubmitHandler);
edit.addEventListener('click', popupOpen);
popupButton.addEventListener('click', popupClose);
