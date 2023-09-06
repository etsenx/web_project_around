export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // Get User Info
  getUserInformation() {
    const userInfo = fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        return Promise.resolve(data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
    return userInfo;
  }

  // Get All Cards
  getCards() {
    const cards = fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((cards) => {
        return Promise.resolve(cards);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
    return cards;
  }

  // Update Profile
  updateProfile(name, about) {
    fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  addCard(name, link) {
    const newCard = fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      console.log("errorhere");
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((newCard) => {
      return Promise.resolve(newCard);
    })
    .catch((err) => {
      return Promise.reject(err);
    })
    return newCard;
  }
}