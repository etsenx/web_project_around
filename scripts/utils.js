import { initialCards } from "./index.js";
import Card from "./Card.js";

const elementSection = document.querySelector(".elements");
const allCloseButton = document.querySelectorAll(".popup__close");
const editButton = document.querySelector(".profile-info__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile-info__name");
const profileAbout = document.querySelector(".profile-info__about");
const allPopup = Array.from(document.querySelectorAll(".popup"));

// Edit Profile Popup
const editProfilePopup = document.querySelector(".popup-edit");
const editPopupNameInput = editProfilePopup.querySelector(".popup__input-name");
const editPopupAboutInput = editProfilePopup.querySelector(
  ".popup__input-about"
);
const editPopupForm = editProfilePopup.querySelector(".popup__form");

// Add Card Popup
const addCardPopup = document.querySelector(".popup-add");
const addCardInputTitle = addCardPopup.querySelector(".popup__input-title");
const addCardInputUrl = addCardPopup.querySelector(".popup__input-url");
const addCardPopupForm = addCardPopup.querySelector(".popup__form");

// Image Popup
const imagePopup = document.querySelector(".popup-img");

function editProfilePopupOpen() {
  editPopupNameInput.value = profileName.textContent;
  editPopupAboutInput.value = profileAbout.textContent;
  editProfilePopup.classList.add("popup_opened");
  document.addEventListener("keyup", addEscListener);
}

function addCardPopupOpen() {
  addCardPopup.classList.add("popup_opened");
  document.addEventListener("keyup", addEscListener);
}

function closePopup() {
  // Close Edit Profile Popup
  editProfilePopup.classList.remove("popup_opened");

  // Close Add New Card Popup
  addCardPopup.classList.remove("popup_opened");
  addCardInputTitle.style.borderColor = "";
  addCardInputUrl.style.borderColor = "";
  addCardInputTitle.value = "";
  addCardInputUrl.value = "";

  // Close Image Detail Popup
  imagePopup.classList.remove("popup_opened");
  document.removeEventListener("keyup", addEscListener);
}

function save(event) {
  event.preventDefault();
  profileName.textContent = editPopupNameInput.value;
  profileAbout.textContent = editPopupAboutInput.value;
  editProfilePopup.classList.remove("popup_opened");
}

function addCard(event) {
  event.preventDefault();
  const inputTitle = addCardInputTitle.value;
  const inputUrl = addCardInputUrl.value;
  initialCards.unshift({
    name: inputTitle,
    link: inputUrl,
  });
  addCardPopup.classList.remove("popup_opened");
  const newCard = new Card(initialCards[0], "#element-template");
  elementSection.prepend(newCard.createCard());
}

export function addEscListener(event) {
  if (event.key === "Escape") {
    closePopup();
  }
}

allPopup.map((popup) => {
  const popupContainer = popup.querySelector(".popup__container");
  popupContainer.addEventListener("mouseleave", function () {
    popup.style.cursor = "pointer";
    popup.addEventListener("mousedown", closePopup);
  });
  popupContainer.addEventListener("mouseover", function () {
    popup.style.cursor = "default";
    popup.removeEventListener("mousedown", closePopup);
  });
});


allCloseButton.forEach((button) => {
  button.addEventListener("click", closePopup);
});

editButton.addEventListener("click", editProfilePopupOpen);
editPopupForm.addEventListener("submit", save);
cardAddButton.addEventListener("click", addCardPopupOpen);
addCardPopupForm.addEventListener("submit", addCard);
