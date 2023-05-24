const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile-info__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const name = document.querySelector('.profile-info__name');
const about = document.querySelector('.profile-info__about');
const nameInput = document.querySelector('.popup__input-name');
const aboutInput = document.querySelector('.popup__input-about');

editButton.addEventListener('click', () => {
  nameInput.value = name.textContent;
  aboutInput.value = about.textContent;
  popup.classList.add('popup_opened');
})

closeButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
})

//Mr Oksana Sergeeva, I tried using submit and it doesn't work. Give me a little bit hint
//Im thinking that should I add form tag to the HTML will that work?
document.querySelector('.popup__save').addEventListener('click', () => {
  name.textContent = nameInput.value;
  about.textContent = aboutInput.value;
  popup.classList.remove('popup_opened');
})