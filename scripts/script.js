const initialCards = [
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

const allCloseButton = document.querySelectorAll(".popup__close");
const editButton = document.querySelector(".profile-info__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const elementSection = document.querySelector(".elements");
const profileName = document.querySelector(".profile-info__name");
const profileAbout = document.querySelector(".profile-info__about");

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
const saveButton = addCardPopup.querySelector(".popup__save");
const addCardPopupForm = addCardPopup.querySelector(".popup__form");

// Image Popup
const imagePopup = document.querySelector(".popup-img");

initialCards.forEach((card) => {
  elementSection.append(createCard(card));
});

function createCard(card) {
  const elementTemplate = document.querySelector("#element-template").content;
  const newElement = elementTemplate.querySelector(".element").cloneNode(true);
  newElement.querySelector(".element__delete-button").addEventListener("click", deleteCard)
  newElement.querySelector(".element__image").addEventListener("click", showImagePopup)
  newElement.querySelector(".element__title").textContent = card.name;
  newElement.querySelector(".element__image").src = card.link;
  newElement.querySelector(".element__image").alt = card.name;
  return newElement;
}

function editProfilePopupOpen() {
  editPopupNameInput.value = profileName.textContent;
  editPopupAboutInput.value = profileAbout.textContent;
  editProfilePopup.classList.add("popup_opened");
}

function addCardPopupOpen() {
  addCardPopup.classList.add("popup_opened");
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
  imagePopup.classList.remove("popup_opened")
}

function save(event) {
  event.preventDefault();
  profileName.textContent = editPopupNameInput.value;
  profileAbout.textContent = editPopupAboutInput.value;
  editProfilePopup.classList.remove("popup_opened");
}

function isInputEmpty() {
  // Profile form
  const inputTitle = addCardInputTitle;
  const inputUrl = addCardInputUrl;
  const titleError = addCardPopup.querySelector("#input-title-error");
  const urlError = addCardPopup.querySelector("#input-url-error");

  // Check if input Title is valid / empty
  if (!inputTitle.checkValidity()) {
    inputTitle.style.borderColor = "red";
    inputTitle.style.marginBottom = "5px";
    titleError.textContent = "Silahkan isi kolom ini.";
    titleError.style.marginBottom = "11px";
  } else {
    inputTitle.style.borderColor = "";
    inputTitle.style.marginBottom = "30px";
    titleError.textContent = "";
    titleError.style.marginBottom = "0";
  }

  // Check if input Url is valid
  if (!inputUrl.checkValidity()) {
    inputUrl.style.borderColor = "red";
    inputUrl.style.marginBottom = "5px";
    urlError.textContent = "Silahkan masukkan alamat web.";
    urlError.style.marginBottom = "29px";
  } else {
    inputUrl.style.borderColor = "";
    inputUrl.style.marginBottom = "48px";
    urlError.textContent = "";
    urlError.style.marginBottom = "0";
  }

  // Save Button Enable / Disable
  if (!inputTitle.checkValidity() || !inputUrl.checkValidity()) {
    saveButton.classList.add("popup__save_disabled");
  } else {
    saveButton.classList.remove("popup__save_disabled");
  }
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
  const newCard = createCard(initialCards[0]);
  elementSection.prepend(newCard);
}

function deleteCard(event) {
  event.preventDefault();
  const selectedElement = event.target.parentElement.parentElement.parentElement.parentElement;
  const selectedElementTitle = selectedElement.querySelector(".element__title").textContent;
  const arrayIndex = initialCards.findIndex(card => card.name === selectedElementTitle);
  initialCards.splice(arrayIndex, 1);
  selectedElement.remove();
}

editButton.addEventListener("click", editProfilePopupOpen);
allCloseButton.forEach((button) => {
  button.addEventListener("click", closePopup);
});

// Image Popup
function showImagePopup(event) {
  event.preventDefault();
  const selectedElement = event.target.parentElement.parentElement.parentElement;
  const selectedElementName = selectedElement.querySelector(".element__title").textContent;
  const selectedElementImageUrl = selectedElement.querySelector(".element__image").src;
  imagePopup.querySelector(".popup-img__name").textContent = selectedElementName;
  imagePopup.querySelector(".popup-img__img").src = selectedElementImageUrl;
  imagePopup.querySelector(".popup-img__img").alt = selectedElement
  imagePopup.classList.add("popup_opened");
}

editPopupForm.addEventListener("submit", save);
addCardInputTitle.addEventListener("keyup", isInputEmpty);
addCardInputUrl.addEventListener("keyup", isInputEmpty);
cardAddButton.addEventListener("click", addCardPopupOpen);
addCardPopupForm.addEventListener("submit", addCard);
