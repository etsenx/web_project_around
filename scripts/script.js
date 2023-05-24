const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile-info__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const name = document.querySelector('.profile-info__name');
const about = document.querySelector('.profile-info__about');
const nameInput = document.querySelector('.popup__input-name');
const aboutInput = document.querySelector('.popup__input-about');
const popupForm = document.querySelector(".popup__form");

editButton.addEventListener('click', () => {
  nameInput.value = name.textContent;
  aboutInput.value = about.textContent;
  popup.classList.add('popup_opened');
})

closeButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
})

popupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  name.textContent = nameInput.value;
  about.textContent = aboutInput.value;
  popup.classList.remove('popup_opened');
})