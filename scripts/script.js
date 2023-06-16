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

const allCloseButton = document.querySelectorAll(".popup__close-button");
const editButton = document.querySelector(".profile-info__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const elementSection = document.querySelector(".elements");
const profileName = document.querySelector(".profile-info__name");
const profileAbout = document.querySelector(".profile-info__about");

// Edit Profile Popup
const editProfilePopup = document.querySelector(".popup_edit");
const editPopupNameInput = editProfilePopup.querySelector(".popup__input-name");
const editPopupAboutInput = editProfilePopup.querySelector(
  ".popup__input-about"
);
const editPopupForm = editProfilePopup.querySelector(".popup__form");

// Add Card Popup
const addCardPopup = document.querySelector(".popup_add");
const addCardInputTitle = addCardPopup.querySelector(".popup__input-title");
const addCardInputUrl = addCardPopup.querySelector(".popup__input-url");
const saveButton = addCardPopup.querySelector(".popup__save");
const addCardPopupForm = addCardPopup.querySelector(".popup__form");

initialCards.forEach((card) => {
  elementSection.append(createCard(card));
});

function createCard(card) {
  const elementTemplate = document.querySelector("#element-template").content;
  const newElement = elementTemplate.querySelector(".element").cloneNode(true);
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
  editProfilePopup.classList.remove("popup_opened");
  addCardPopup.classList.remove("popup_opened");
}

function save(event) {
  event.preventDefault();
  profileName.textContent = editPopupNameInput.value;
  profileAbout.textContent = editPopupAboutInput.value;
  editProfilePopup.classList.remove("popup_opened");
}

function isInputEmpty() {
  const inputTitle = addCardInputTitle.value;
  const inputUrl = addCardInputUrl.value;
  // Profile form
  if (inputTitle === "" || inputUrl === "") {
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
    link: inputUrl
  })
  addCardPopup.classList.remove("popup_opened");
  const newCard = createCard(initialCards[0])
  elementSection.prepend(newCard)
}

editButton.addEventListener("click", editProfilePopupOpen);
allCloseButton.forEach((button) => {
  button.addEventListener("click", closePopup);
});
editPopupForm.addEventListener("submit", save);
addCardInputTitle.addEventListener("keypress", isInputEmpty);
addCardInputUrl.addEventListener("keypress", isInputEmpty);
cardAddButton.addEventListener("click", addCardPopupOpen);
addCardPopupForm.addEventListener("submit", addCard);