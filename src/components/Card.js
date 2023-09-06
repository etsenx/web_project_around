import likeImg from "../images/like.svg";
import likeImgFilled from "../images/like(filled).svg";

export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this.name = cardData.name;
    this.link = cardData.link;
    this.likes = cardData.likes;
    this.template = templateSelector;
    this.handleCardClick = handleCardClick;
  }

  _getElement() {
    const cardElement = document
      .querySelector(`${this.template}`)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  // Handle markup
  createCard() {
    const newCardElement = this._getElement();
    this._setEventListener(newCardElement, ".element__delete-button", "click", this._deleteCard);
    this._setEventListener(newCardElement, ".element__image", "click", this.handleCardClick);
    this._setEventListener(newCardElement, ".element__like-button", "click", this._likeCard);
    newCardElement.querySelector(".element__like-counter").textContent = this.likes.length;
    newCardElement.querySelector(".element__title").textContent = this.name;
    newCardElement.querySelector(".element__image").src = this.link;
    newCardElement.querySelector(".element__image").alt = this.name;
    return newCardElement;
  }

  // Adding event listener
  _setEventListener(cardElement, elementSelector, eventType, eventMethod) {
    cardElement
      .querySelector(elementSelector)
      .addEventListener(eventType, eventMethod);
  }

  // Event handler
  _deleteCard(event) {
    event.preventDefault();
    const deletePopup = document.querySelector(".popup-delete");
    deletePopup.classList.add("popup_opened");
    // const selectedElement = event.target.closest(".element");
    // const selectedElementTitle =
    //   selectedElement.querySelector(".element__title").textContent;
    // const arrayIndex = initialCards.findIndex(
    //   (card) => card.name === selectedElementTitle
    // );
    // initialCards.splice(arrayIndex, 1);
    // selectedElement.remove();
  }

  _likeCard(event) {
    event.preventDefault();
    const selectedElement = event.target.closest(".element")
    const selectedElementLikeImg =
      selectedElement.querySelector(".element__like-img");
    const liked = selectedElementLikeImg.classList.contains("liked");
    if (liked) {
      selectedElementLikeImg.src = likeImg;
      selectedElementLikeImg.classList.remove("liked");
    } else {
      selectedElementLikeImg.src = likeImgFilled;
      selectedElementLikeImg.classList.add("liked");
    }
  }

}
