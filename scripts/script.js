const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile-info__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const saveButton = document.querySelector(".popup__save");
const name = document.querySelector(".profile-info__name");
const about = document.querySelector(".profile-info__about");

editButton.addEventListener("click", () => {
  let nameInput = document.querySelector(".popup__input-name");
  let aboutInput = document.querySelector(".popup__input-about");
  nameInput.value = name.textContent;
  aboutInput.value = about.textContent;
  popup.style.display = "block";
})

closeButton.addEventListener("click", () => {
  popup.style.display = "none";
})

saveButton.addEventListener("click", () => {
  const saveName = document.querySelector(".popup__input-name");
  const saveAbout = document.querySelector(".popup__input-about");

  name.textContent = saveName.value;
  about.textContent = saveAbout.value;
  popup.style.display = "none";
})