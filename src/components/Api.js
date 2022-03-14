export class Api {
    constructor(options) {
        this._baseURL = options.baseURL;
        this._authorization = options.authorization;
    }
    getInitialCards() {
        return fetch(`${this._baseURL}/cards`, {
            headers: {
                authorization: `${this._authorization}`
            }
        }).then((res) => {
            if (res.ok){
            return res.json();
        }
        else{
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
            })
    }
    getUserInfo() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort36/users/me', {
            headers: {
                authorization: `${this._authorization}`
            }
        }).then((res) => {
            if (res.ok){
            return res.json();
        }
        else{
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
            })
    }
    setUserInfo() {
        fetch('https://mesto.nomoreparties.co/v1/cohort36/users/me', {
            headers: {
                authorization: `${this._authorization}`
            }
        })
            .then((res) => {
                if (res.ok){
                return res.json();
            }
            else{
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
            })
            .then((res) => {
                document.querySelector('.profile__description').textContent = res.about;
                document.querySelector('.profile__title').textContent = res.name;
                document.querySelector('.profile__avatar').src = res.avatar;
            })
            .catch((err)=>{console.log(err)})
    }
    patchUserInfo(userName, userAbout) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort36/users/me', {
            method: 'PATCH',
            headers: {
                authorization: `${this._authorization}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userName,
                about: userAbout
            })
        }).then((res) => {
            if (res.ok){
                return res.json();
            }
            else{
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            }
        })}

    patchAvatarInfo (link) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort36/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: 'a4b67e43-7921-4ffc-97a3-90eb387a74ab',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: link
            })
    })
}
        
    postNewCard (name,link){
        return fetch('https://mesto.nomoreparties.co/v1/cohort36/cards', {
            method: 'POST',
            headers: {
                authorization: 'a4b67e43-7921-4ffc-97a3-90eb387a74ab',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then((res) => {
            if (res.ok){
            return res.json();
        }
        else{
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
        })
    }

    deleteCard(id) {
        fetch(`${this._baseURL}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: 'a4b67e43-7921-4ffc-97a3-90eb387a74ab',
                'Content-Type': 'application/json'
            }
        })
    }
    
    
    like(id) {
        return fetch(`${this._baseURL}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: `${this._authorization}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.ok){
            return res.json();
        }
        else{
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
        })
    }

    unlike(id) {
        return fetch(`${this._baseURL}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._authorization}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.ok){
            return res.json();
        }
        else{
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
        })
    }
   
    
}