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
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector(".popup__close");
    closeButton.addEventListener("click", () => {
      this.close();
    });
    // const popupContainer = this._popup.querySelector(".popup__container");
    // popupContainer.addEventListener("mouseleave", () => {
    //   this._popup.style.cursor = "pointer";
    //   this._popup.addEventListener("mousedown", () => {
    //     this.close();
    //   });
    // })
    // popupContainer.addEventListener("mouseover", () => {
    //   this._popup.style.cursor = "default";
    //   this._popup.addEventListener("mousedown", () => {
    //     this.open();
    //   })
    // })
  }
}