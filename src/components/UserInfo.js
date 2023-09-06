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

  setUserInfo({name, about}) {
    const profileName = document.querySelector(".profile-info__name");
    const profileAbout = document.querySelector(".profile-info__about");
    this._name = name;
    this._about = about;
    profileName.textContent = this._name;
    profileAbout.textContent = this._about;
  }
}
