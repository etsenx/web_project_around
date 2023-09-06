import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  editProfilePopup,
  editPopupForm,
  profileName,
  profileAbout,
  editPopupAboutInput,
  editPopupNameInput,
  editButton,
  addCardPopup,
  addCardPopupForm,
  imgPopupSelector,
  elementSection,
  cardAddButton,
  profilePicture
} from "./utils.js";
import "../pages/index.css";

// export const initialCards = [
//   {
//     name: "Lembah Yosemite",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
//   },
//   {
//     name: "Danau Louise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
//   },
//   {
//     name: "Pegunungan Gundul",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
//   },
//   {
//     name: "Gunung Latemar",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
//   },
//   {
//     name: "Taman Nasional Vanoise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
//   },
// ];

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_id_03",
  headers: {
    authorization: "8746c452-39d4-4cd4-8e82-ac5a93e07813",
    "Content-Type": "application/json",
  },
});

// Edit Profile Popup
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

// User Data
const userData = await api.getUserInformation();
profileName.textContent = userData.name;
profileAbout.textContent = userData.about;
profilePicture.src = userData.avatar;

const newUser = new UserInfo({
  name: userData.name,
  about: userData.about,
});

const editProfilePopupClass = new PopupWithForm(async () => {
  api.updateProfile(editPopupNameInput.value, editPopupAboutInput.value);
  newUser.setUserInfo(await api.getUserInformation());
  editProfilePopupClass.close();
}, editProfilePopup);
editProfilePopupClass.setEventListeners();

editButton.addEventListener("click", () => {
  const userInfo = newUser.getUserInfo();
  editPopupNameInput.value = userInfo.name;
  editPopupAboutInput.value = userInfo.about;
  editProfilePopupClass.open();
});

// Add Card Popup
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
const imgPopup = new PopupWithImage(imgPopupSelector);
imgPopup.setEventListeners();

// Create Card Section
const initialCards = await api.getCards();
const cardSection = new Section(
  {
    // Initial Card Elements
    items: initialCards,
    // Create Card Element method
    renderer: (card) => {
      const newCard = new Card(card, "#element-template", (evt) => {
        imgPopup.open(evt);
      });
      cardSection.addItem(newCard.createCard(userData._id));
    },
  },
  ".elements"
);

cardSection.renderItems();

// Add New Card Popup Form
const addCardPopupClass = new PopupWithForm(async () => {
  const inputTitle = addCardPopupClass.getInputValues(".popup__input-title");
  const inputUrl = addCardPopupClass.getInputValues(".popup__input-url");
  const createdCard = await api.addCard(inputTitle, inputUrl);
  const newCard = new Card(createdCard, "#element-template", (evt) => {
    imgPopup.open(evt);
  })
  elementSection.prepend(newCard.createCard(userData._id));
  addCardPopupClass.close();
}, addCardPopup);
addCardPopupClass.setEventListeners();

cardAddButton.addEventListener("click", () => {
  addCardPopupClass.open();
});

// Confirm Delete Card Popup
export const deleteCardPopup = new Popup(document.querySelector(".popup-delete"));
deleteCardPopup.setEventListeners();