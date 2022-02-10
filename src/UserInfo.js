export class UserInfo {
    constructor({userNameSelector,userDescriptionSelector}) {
        this._userName= document.querySelector(userNameSelector);
        this._userDescription = document.querySelector(userDescriptionSelector);
    }
    getUserInfo() {
        const obj = {name:this._userName.textContent, description: this._userDescription.textContent};
        return obj;
    }
    setUserInfo(name,description) {
        this._userName.textContent=name;
        this._userDescription.textContent = description;
    }
}