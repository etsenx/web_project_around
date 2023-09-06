import likeImg from "../images/like.svg";
import likeImgFilled from "../images/like(filled).svg";
import { deleteCardPopup, api } from "../scripts/index.js";

export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this.name = cardData.name;
    this.link = cardData.link;
    this._id = cardData._id;
    this.likes = cardData.likes;
    this.cardOwner = cardData.owner;
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
  createCard(currentUserId) {
    const newCardElement = this._getElement();
    newCardElement.id = this._id;
    this._setEventListener(newCardElement, ".element__delete-button", "click", this._deleteCard);
    this._setEventListener(newCardElement, ".element__image", "click", this.handleCardClick);
    this._setEventListener(newCardElement, ".element__like-button", "click", this._likeCard);
    newCardElement.querySelector(".element__like-counter").textContent = this.likes.length;
    newCardElement.querySelector(".element__title").textContent = this.name;
    newCardElement.querySelector(".element__image").src = this.link;
    newCardElement.querySelector(".element__image").alt = this.name;
    this.likes.forEach((userWhoLiked) => {
      if (currentUserId === userWhoLiked._id) {
        const currentLikeImg = newCardElement.querySelector(".element__like-img");
        currentLikeImg.src = likeImgFilled;
        currentLikeImg.classList.add("liked");
      }
    })
    if (this.cardOwner._id !== currentUserId) {
      newCardElement.querySelector(".element__delete-button").style.display = "none";
    }
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
    deleteCardPopup.open();
    const popupButton = deleteCardPopup.getSaveButton();
    popupButton.addEventListener("click", () => {
    const selectedElement = event.target.closest(".element");
    api.deleteCard(selectedElement.id);
    selectedElement.remove();
    deleteCardPopup.close();
    })

  }

  async _likeCard(event) {
    event.preventDefault();
    const selectedElement = event.target.closest(".element")
    const selectedElementLikeImg =
      selectedElement.querySelector(".element__like-img");
      const likesCounter = selectedElement.querySelector(".element__like-counter");
    const liked = selectedElementLikeImg.classList.contains("liked");
    if (liked) {
      const currentCardLikes = await api.unlikeCard(selectedElement.id);
      likesCounter.textContent = currentCardLikes;
      selectedElementLikeImg.src = likeImg;
      selectedElementLikeImg.classList.remove("liked");
    } else {
      const currentCardLikes = await api.likeCard(selectedElement.id);
      likesCounter.textContent = currentCardLikes;
      selectedElementLikeImg.src = likeImgFilled;
      selectedElementLikeImg.classList.add("liked");
    }
  }

}
