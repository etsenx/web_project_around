export default class UserInfo {
  constructor({ name, about }) {
    this._name = name;
    this._about = about;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name,
      about: this._about,
    };
    return userInfo;
  }

  setUserInfo() {
    const profileName = document.querySelector(".profile-info__name");
    const profileAbout = document.querySelector(".profile-info__about");
    const editPopupNameInput =
      document.querySelector(".popup__input-name");
    const editPopupAboutInput = document.querySelector(
      ".popup__input-about"
    );
    this._name = editPopupNameInput.value;
    this._about = editPopupAboutInput.value;
    profileName.textContent = this._name;
    profileAbout.textContent = this._about;
  }
}
