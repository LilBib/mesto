export class Api {
    constructor(options) {
        this._baseURL = options.baseURL;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        }
    }

    getInitialCards() {
        return fetch(`${this._baseURL}/cards`, {
            headers: this._headers
        }).then(this._checkResponse)
    }
    getUserInfo() {
        return fetch(`${this._baseURL}/users/me`, {
            headers: this._headers
        }).then(this._checkResponse)
    }
    setUserInfo() {
        return fetch(`${this._baseURL}/users/me`, {
            headers: this._headers
        })
            .then(this._checkResponse)
    }
    patchUserInfo(userName, userAbout) {
        return fetch(`${this._baseURL}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userName,
                about: userAbout
            })
        }).then(this._checkResponse)
    }

    patchAvatarInfo(link) {
        return fetch(`${this._baseURL}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        }).then(this._checkResponse)
    }

    postNewCard(name, link) {
        return fetch(`${this._baseURL}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(this._checkResponse)
    }

    deleteCard(id) {
        return fetch(`${this._baseURL}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
    }


    like(id) {
        return fetch(`${this._baseURL}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        }).then(this._checkResponse)
    }

    unlike(id) {
        return fetch(`${this._baseURL}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._checkResponse)
    }


}