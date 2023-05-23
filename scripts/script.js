const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile-info__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const saveButton = document.querySelector(".popup__save");
const name = document.querySelector(".profile-info__name");
const about = document.querySelector(".profile-info__about");
const nameInput = document.querySelector(".popup__input-name");
const aboutInput = document.querySelector(".popup__input-about");

function enableButton() {
  if (nameInput.value === "" || aboutInput.value === "") {
    saveButton.disabled = true;
    saveButton.classList.add("popup__save_disabled");
  } else {
    saveButton.disabled = false;
    saveButton.classList.remove("popup__save_disabled");
  }
}

editButton.addEventListener("click", () => {
  nameInput.value = name.textContent;
  aboutInput.value = about.textContent;
  popup.classList.add("popup_opened");
})

closeButton.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
  saveButton.disabled = false;
  saveButton.classList.remove("popup__save_disabled");
})

saveButton.addEventListener("click", () => {
  const saveName = document.querySelector(".popup__input-name");
  const saveAbout = document.querySelector(".popup__input-about");

  name.textContent = saveName.value;
  about.textContent = saveAbout.value;
  popup.classList.remove("popup_opened");
})