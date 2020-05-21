function showInputError(params, formElement, inputElement, errorMessage) {

  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(params.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(params.errorClass);
};

function hideInputError(params, formElement, inputElement) {

  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(params.inputErrorClass);
  errorElement.classList.remove(params.errorClass);
  errorElement.textContent = '';
};


function isValid(params, formElement, inputElement) {

  if (!inputElement.validity.valid) {
    showInputError(params, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(params, formElement, inputElement);
  }

};

function hasInvalidInput(inputList) {

  return inputList.some((inputElement) => {

    return !inputElement.validity.valid;
  })
};

function toggleButtonState(params, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(params.inactiveButtonClass);
    buttonElement.disabled=true;
  } else {
    buttonElement.classList.remove(params.inactiveButtonClass);
    buttonElement.disabled=false;
  }
};

function setEventListeners(params, formElement, inactiveDefault) {

  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));

  const buttonElement = formElement.querySelector(params.submitButtonSelector);

  if(inactiveDefault) {
    toggleButtonState(params, inputList, buttonElement);
  }

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(params, formElement, inputElement);
      toggleButtonState(params, inputList, buttonElement);
    });
  });
};

function enableValidation(params) {

  const formList = Array.from(document.querySelectorAll(params.formSelector));

  formList.forEach((formElement) => {
    if(formElement.closest(params.formParentSelector).classList.contains(params.formInactiveDefault)) {
      setEventListeners(params, formElement, true);
    } else {
      setEventListeners(params, formElement, false);
    }
  });
};

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  formParentSelector: '.popup',
  formInactiveDefault: 'popup_type_addcard'
});
