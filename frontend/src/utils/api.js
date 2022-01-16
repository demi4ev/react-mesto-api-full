import { BASE_URL } from '../utils/auth';

export class Api {


  constructor({ address, token }) {
    this._address = address;
    this._token = token;
    // this._headers = headers;
  }


  // получение карточек

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: `Bearer ${this._token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(this._checkResponseData)
  }


  _checkResponseData(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }


  // добавление карточки

  addCard(title, link) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: title,
        link: link
      })
    })
    .then(this._checkResponseData)
  }


  // удаление карточки

  removeCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`,{
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${this._token}`
      }
    })
    .then(this._checkResponseData)
  }


  // лайки с сервера

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._address}/cards/likes/${cardId}`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        authorization: `Bearer ${this._token}`
      }
    })
    .then(this._checkResponseData)
  }


  // снятиие лайка

  removeLike(cardId) {
    return fetch(`${this._address}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${this._token}`
      }
    })
    .then(this._checkResponseData)
  }


  // получение инфы о юзере

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: `Bearer ${this._token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(this._checkResponseData)
  }


  // изменение инфы о юзере

  setUserInfo(name, about) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      }),
    })
    .then(this._checkResponseData)
  }


  // смена аватара

  updateAvatar(avatarLink) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${this._token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
    .then(this._checkResponseData)
  }

}

// const api = new Api ({
//   address: 'https://mesto.nomoreparties.co/v1/cohort-26',
//   // headers: {
//   //   authorization: '136295e8-ffc2-40cf-adc6-28fc5ce50eaf',
//   //   'Content-type': 'application/json'
//   // }
//   token: '136295e8-ffc2-40cf-adc6-28fc5ce50eaf'
// })

const api = new Api ({
  adress: BASE_URL,
  token: localStorage.getItem('token')
})

export default api;
