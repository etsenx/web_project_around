export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  open() {
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      if (this._popup.classList.contains("popup_opened")) {
        this.close();
      }
    }
  }

  setEventListeners() {
    // Add Close Button Listener
    const closeButton = this._popup.querySelector(".popup__close");
    closeButton.addEventListener("click", () => {
      this.close();
    });

    // Add Esc Listener
    document.addEventListener("keyup", this._handleEscClose.bind(this));

    // Add click outside of popup listener
    const popupContainer = this._popup.querySelector(".popup__container");
    const closeFunction = this.close.bind(this);
    popupContainer.addEventListener("mouseleave", () => {
      this._popup.style.cursor = "pointer";
      this._popup.addEventListener("mousedown", closeFunction);
    })
    popupContainer.addEventListener("mouseover", () => {
      this._popup.style.cursor = "default";
      this._popup.removeEventListener("mousedown", closeFunction);
    })
  }
}