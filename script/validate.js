const inputError = (params, formElement, inputElement) => {

  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.toggle(params.inputErrorClass, !inputElement.validity.valid);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.toggle(params.errorClass, !inputElement.validity.valid);

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

  const inputElements = Array.from(formElement.querySelectorAll(params.inputSelector));

  const buttonElement = formElement.querySelector(params.submitButtonSelector);

  if(inactiveDefault) {
    toggleButtonState(params, inputElements, buttonElement);
  }

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      inputError(params, formElement, inputElement);
      toggleButtonState(params, inputElements, buttonElement);
    });
  });
};

const validateForm = (params, popupElement) => {
  const formElement = popupElement.querySelector(params.formSelector);
  const inputElements = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement = formElement.querySelector(params.submitButtonSelector);

  inputElements.forEach((inputElement) => {
    inputError(params, formElement, inputElement);
    toggleButtonState(params, inputElements, buttonElement);
  });
};

const enableValidation = (params) => {

  const formElements = Array.from(document.querySelectorAll(params.formSelector));

  formElements.forEach((formElement) => {
      setEventListeners(params, formElement, formElement.closest(params.formParentSelector).classList.contains(params.formInactiveDefault));
  });
};

