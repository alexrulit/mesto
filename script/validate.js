const inputError = (params, formElement, inputElement, errorMessage, action) => {

  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  if(!action) {
    inputElement.classList.add(params.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(params.errorClass);
  } else {
    inputElement.classList.remove(params.inputErrorClass);
    errorElement.classList.remove(params.errorClass);
    errorElement.textContent = '';
  }
};

const hasInvalidInput = (inputsList) => {

  return inputsList.some((inputElement) => {

    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (params, inputsList, buttonElement) => {

    buttonElement.classList.toggle(params.inactiveButtonClass, hasInvalidInput(inputsList));
    buttonElement.disabled=hasInvalidInput(inputsList);

};

const setEventListeners = (params, formElement, inactiveDefault) => {

  const inputsList = Array.from(formElement.querySelectorAll(params.inputSelector));

  const buttonElement = formElement.querySelector(params.submitButtonSelector);

  if(inactiveDefault) {
    toggleButtonState(params, inputsList, buttonElement);
  }

  inputsList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      inputError(params, formElement, inputElement, inputElement.validationMessage, inputElement.validity.valid);
      toggleButtonState(params, inputsList, buttonElement);
    });
  });
};

const enableValidation = (params) => {

  const formsList = Array.from(document.querySelectorAll(params.formSelector));

  formsList.forEach((formElement) => {
      setEventListeners(params, formElement, formElement.closest(params.formParentSelector).classList.contains(params.formInactiveDefault));
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
