const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const spanElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(inputErrorClass);
  spanElement.classList.add(errorClass);
  spanElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const spanElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(inputErrorClass);
  spanElement.classList.remove(errorClass);
  spanElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (allInputElement) => {
  const result = allInputElement.some(inputElement => {
    return !inputElement.validity.valid;
  })
  return result;
};

const toggleButton = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass) => {
  const buttonElement = formElement.querySelector(submitButtonSelector);
  const allInputElement = Array.from(formElement.querySelectorAll(inputSelector));
  if (hasInvalidInput(allInputElement)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass)
  }
};

const enableValidation = (obj) => {
  const form = Array.from(document.querySelectorAll(obj.formSelector));
  form.map((formElement) => {
    formElement.addEventListener("input", function (evt) {
      checkInputValidity(formElement, evt.target, obj.inputErrorClass, obj.errorClass);
      toggleButton(formElement ,obj.inputSelector, obj.submitButtonSelector, obj.inactiveButtonClass)
    });
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
