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

const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile-info__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const name = document.querySelector(".profile-info__name");
const about = document.querySelector(".profile-info__about");
const nameInput = document.querySelector(".popup__input-name");
const aboutInput = document.querySelector(".popup__input-about");
const popupForm = document.querySelector(".popup__form");
const elementSection = document.querySelector(".elements");

initialCards.forEach((card) => {
  const elementTemplate = document.querySelector("#element-template").content;
  const newElement = elementTemplate.querySelector(".element").cloneNode(true);
  newElement.querySelector(".element__title").textContent = card.name;
  newElement.querySelector(".element__image").src = card.link;
  newElement.querySelector(".element__image").alt = card.name;
  elementSection.append(newElement);
});

function edit() {
  nameInput.value = name.textContent;
  aboutInput.value = about.textContent;
  popup.classList.add("popup_opened");
}

function close() {
  popup.classList.remove("popup_opened");
}

function save(event) {
  event.preventDefault();
  name.textContent = nameInput.value;
  about.textContent = aboutInput.value;
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", edit);
closeButton.addEventListener("click", close);
popupForm.addEventListener("submit", save);
