export class Api {
    constructor(options) {
        this._baseURL = options.baseURL;
        this._authorization = options.authorization;
        this._avatar = document.querySelector('.profile__avatar');
        this._profileTitle = document.querySelector('.profile__title');
        this._profileDescription = document.querySelector('.profile__description');
    }
    getInitialCards() {
        return fetch(`${this._baseURL}/cards`, {
            headers: {
                authorization: `${this._authorization}`
            }
        }).then((res) => {
            return res.json();
        })
    }
    getUserInfo() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort36/users/me', {
            headers: {
                authorization: `${this._authorization}`
            }
        }).then((res) => {
            return res.json();
        })
    }
    setUserInfo() {
        fetch('https://mesto.nomoreparties.co/v1/cohort36/users/me', {
            headers: {
                authorization: `${this._authorization}`
            }
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                this._profileDescription.textContent = res.about;
                this._profileTitle.textContent = res.name;
                this._avatar.src = res.avatar;
            })
    }
    patchUserInfo(userName, userAbout) {
        fetch('https://mesto.nomoreparties.co/v1/cohort36/users/me', {
            method: 'PATCH',
            headers: {
                authorization: `${this._authorization}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userName,
                about: userAbout
            })
        })
    }

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
            return res.json();
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
        }).then(res=> {return res.json()})
    }

    unlike(id) {
        return fetch(`${this._baseURL}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._authorization}`,
                'Content-Type': 'application/json'
            }
        }).then(res=> {return res.json()})
    }
    getLikesCount(id)
    {
        return fetch(`${this._baseURL}/cards/`, {
            headers: {
                authorization: `${this._authorization}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json();
        })
    }
    
}