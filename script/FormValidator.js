export default class FormValidator {
  constructor(params, formElement) {
    this._params = params;
    this._formElement = formElement;
  }

  _hasInvalidInput() {
    return this._inputElements.some((inputElement) => {

      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    this._buttonElement.classList.toggle(this._params.inactiveButtonClass, this._hasInvalidInput());
    this._buttonElement.disabled=this._hasInvalidInput();
  }

  _inputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.toggle(this._params.inputErrorClass, !inputElement.validity.valid);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.toggle(this._params.errorClass, !inputElement.validity.valid);
  }

  _setEventListeners(inactiveDefault) {
    this._inputElements = Array.from(this._formElement.querySelectorAll(this._params.inputSelector));

    this._buttonElement = this._formElement.querySelector(this._params.submitButtonSelector);

    if(inactiveDefault) {
      this._toggleButtonState();
    }

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._inputError(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {

    this._setEventListeners(this._formElement.closest(this._params.formParentSelector).classList.contains(this._params.formInactiveDefault));

  }
}
