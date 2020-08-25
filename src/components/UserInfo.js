export default class UserInfo {
  constructor(authorSelector, descSelector, avatarSelector) {
    this._authorSelector = authorSelector;
    this._descSelector = descSelector;
    this._avatarSelector = avatarSelector;
    this._authorElement = document.querySelector(this._authorSelector);
    this._descElement = document.querySelector(this._descSelector);
    this._avatarElement = document.querySelector(this._avatarSelector);
  }

  getUserInfo(){
    const userInfo = {};
    userInfo.author = this._authorElement.textContent;
    userInfo.description = this._descElement.textContent;

    return userInfo;
  }

  setUserInfo(author, description){
    this._authorElement.textContent = author;
    this._descElement.textContent = description;
  }

  setUserAvatar(avatar){
    this._avatarElement.src = avatar;
  }

  getUserAvatar() {
    return this._avatarElement.src;
  }

  setUserId(userId) {
    this._userId = userId;
  }

  getUserId(){
    return this._userId;
  }
}
