import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

export const initialCards = [
  {
    name: "Lembah Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Danau Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Pegunungan Gundul",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Gunung Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Taman Nasional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// Edit Profile Popup
const editProfilePopup = document.querySelector(".popup-edit");
const editPopupForm = editProfilePopup.querySelector(".popup__form");
const editPopupFormValidator = new FormValidator(
  {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save",
    inactiveButtonClass: "popup__save_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  },
  editPopupForm
);
editPopupFormValidator.enableValidation();


// Edit Profile Popup Form
const profileName = document.querySelector(".profile-info__name");
const profileAbout = document.querySelector(".profile-info__about");
const editPopupNameInput = editProfilePopup.querySelector(".popup__input-name");
const editPopupAboutInput = editProfilePopup.querySelector(".popup__input-about");

// User Data
const newUser = new UserInfo({
  name: profileName.textContent,
  about: profileAbout.textContent
})

const editProfilePopupClass = new PopupWithForm(() => {
  newUser.setUserInfo();
  editProfilePopupClass.close();
}, editProfilePopup)
editProfilePopupClass.setEventListeners();

const editButton = document.querySelector(".profile-info__edit-button");
editButton.addEventListener("click", () => {
  const userInfo = newUser.getUserInfo();
  editPopupNameInput.value = userInfo.name;
  editPopupAboutInput.value = userInfo.about;
  editProfilePopupClass.open();
});

// Add Card Popup
const addCardPopup = document.querySelector(".popup-add");
const addCardPopupForm = addCardPopup.querySelector(".popup__form");
const addCardPopupFormValidator = new FormValidator(
  {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save",
    inactiveButtonClass: "popup__save_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  },
  addCardPopupForm
);
addCardPopupFormValidator.enableValidation();

// Card Img Popup
const imgPopupSelector = document.querySelector(".popup-img");
const imgPopup = new PopupWithImage(imgPopupSelector);
imgPopup.setEventListeners();

// Create Card Section
const cardSection = new Section(
  {
    // Initial Card Elements
    items: initialCards,
    // Create Card Element method
    renderer: (card) => {
      const newCard = new Card(card, "#element-template", (evt) => {
        imgPopup.open(evt);
      });
      cardSection.addItem(newCard.createCard());
    },
  },
  ".elements"
);

cardSection.renderItems();

// Add New Card Popup Form
const elementSection = document.querySelector(".elements");
const addCardPopupClass = new PopupWithForm(() => {
  const inputTitle = addCardPopupClass._getInputValues(".popup__input-title");
  const inputUrl = addCardPopupClass._getInputValues(".popup__input-url");
  initialCards.unshift({
    name: inputTitle,
    link: inputUrl,
  });
  const newCard = new Card(initialCards[0], "#element-template", (evt) => {
    imgPopup.open(evt);
  });
  elementSection.prepend(newCard.createCard());
  addCardPopupClass.close();
}, addCardPopup);
addCardPopupClass.setEventListeners();

const cardAddButton = document.querySelector(".profile__add-button");
cardAddButton.addEventListener("click", () => {
  addCardPopupClass.open();
});
