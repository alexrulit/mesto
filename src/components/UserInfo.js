export default class UserInfo {
  constructor(authorSelector, descSelector) {
    this._authorSelector = authorSelector;
    this._descSelector = descSelector;
    this._authorElement = document.querySelector(this._authorSelector);
    this._descElement = document.querySelector(this._descSelector);
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
}
