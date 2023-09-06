import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleSubmit, popupSelector) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
  }

  getInputValues(inputSelector) {
    const input = document.querySelector(inputSelector);
    return input.value;
  }

  close() {
    super.close();
    const allPopupLabel = this._popup.querySelectorAll(".popup__field");
    allPopupLabel.forEach((label) => {
      const input = label.firstElementChild;
      const span = label.lastElementChild;
      input.value = "";
      span.textContent = "";
      input.classList.remove("popup__input_type_error")
      span.classList.remove("popup__error_visible");
    })
    const button = this._popup.querySelector(".popup__save");
    button.classList.add("popup__save_disabled");
  }

  setEventListeners() {
    super.setEventListeners();
    const popupForm = this._popup.querySelector(".popup__form");
    popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    })
  }
}