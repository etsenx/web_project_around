export default class FormValidator {
  constructor(classSelector ,formData) {
    this._formData = formData;
    this._inputSelector = classSelector.inputSelector;
    this._submitButtonSelector = classSelector.submitButtonSelector;
    this._inactiveButtonClass = classSelector.inactiveButtonClass;
    this._inputErrorClass = classSelector.inputErrorClass;
    this._errorClass = classSelector.errorClass;
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const spanElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(this._inputErrorClass);
    spanElement.classList.add(this._errorClass);
    spanElement.textContent = errorMessage;
  }

  _hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
    const spanElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(this._inputErrorClass);
    spanElement.classList.remove(this._errorClass);
    spanElement.textContent = "";
  }

  _checkInputValidity (formElement, inputElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
        this._showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
      } else {
        this._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
      }
  }

  _hasInvalidInput(allInputElement) {
    const result = allInputElement.some(inputElement => {
      return !inputElement.validity.valid;
    })
    return result;
  }

  _toggleButton(formElement, inputSelector, submitButtonSelector, inactiveButtonClass) {
    const buttonElement = formElement.querySelector(submitButtonSelector);
    const allInputElement = Array.from(formElement.querySelectorAll(inputSelector));
    if (this._hasInvalidInput(allInputElement)) {
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.classList.remove(inactiveButtonClass)
    }
  }

  enableValidation() {
    this._formData.addEventListener("input", (evt) => {
      this._checkInputValidity(this._formData, evt.target, this._inputErrorClass, this._errorClass);
      this._toggleButton(this._formData, this._inputSelector, this._submitButtonSelector, this._inactiveButtonClass);
    })
  }
}