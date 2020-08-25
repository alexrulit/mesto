export default class Api {
  constructor(options){
    this._baseUrl = options.baseUrl;
    this._token = options.headers.authorization;
    this._contentType = options.headers.contentType;
  }

  _sendRequest(endpoint, method, body){
    this._endpoint = endpoint;
    this._method = method;
    this._headers = {
        authorization: this._token,
        'Content-type': this._contentType
    };
    this._body = body;
    this._requestInit = {
      method: this._method,
      headers: this._headers
    };
    if(this._method === 'POST' || this._method === 'PATCH'){
      this._requestInit.body = this._body;
    }
    return fetch(this._baseUrl + this._endpoint, this._requestInit)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserInfo() {
    return this._sendRequest('/users/me', 'GET', {});
  }

  getInitialCards() {
    return this._sendRequest('/cards', 'GET', {});
  }

  setUserInfo(name, about) {
    this._body = JSON.stringify({
        name: name,
        about: about
    });
    return this._sendRequest('/users/me', 'PATCH', this._body);
  }

  addNewCard(name, link) {
    this._body = JSON.stringify({
        name: name,
        link: link
    });
    return this._sendRequest('/cards', 'POST', this._body);
  }

  cardLike(cardId, state) {
    this._cardId = cardId;
    if(state){
      this._method = 'DELETE';
    } else {
      this._method = 'PUT';
    }
    return this._sendRequest('/cards/likes/' + this._cardId, this._method, {});
  }

  deleteCard(cardId) {
    this._cardId = cardId;
    return this._sendRequest('/cards/' + this._cardId, 'DELETE', {});
  }

  setAvatar(avatarLink) {
    this._body = JSON.stringify({
        avatar: avatarLink
    });
    return this._sendRequest('/users/me/avatar', 'PATCH', this._body);
  }
}
