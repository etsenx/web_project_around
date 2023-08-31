import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open(evt) {
    super.open();
    const selectedElement = evt.target.closest(".element");
    const selectedElementName = selectedElement.querySelector(".element__title").textContent;
    const selectedElementImageUrl = selectedElement.querySelector(".element__image").src;
    this._popup.querySelector(".popup-img__name").textContent = selectedElementName;
    this._popup.querySelector(".popup-img__img").src = selectedElementImageUrl;
    this._popup.classList.add("popup_opened");
  }
}