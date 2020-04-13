let popup = document.querySelector('.popup');
let edit = document.querySelector('.profile__edit-button');
let popup_button = document.querySelector('.popup__close');
let author = document.querySelector('.profile__title');
let desc = document.querySelector('.profile__subtitle');
let popup_author = document.querySelector('.popup__author');
let popup_desc = document.querySelector('.popup__description');
let form = document.querySelector('.popup__container');

function popup_open() {
  popup.classList.remove('popup_type_closed');
  popup_author.value = author.textContent;
  popup_desc.value = desc.textContent;
}

function popup_close() {
  popup.classList.add('popup_type_closed');
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  author.textContent = popup_author.value;
  desc.textContent = popup_desc.value;

  popup_close();
}

form.addEventListener('submit', formSubmitHandler);
edit.addEventListener('click', popup_open);
popup_button.addEventListener('click', popup_close);
