export class Api {
    constructor() {

    }

    getUserInfo() {
        return fetch('https://nomoreparties.co/cohort10/users/me', {
            headers: {
                authorization: '7a45e0e5-9273-458c-8551-b84f43589b7b'
            }
        })
        .then((res) => {
            if (res.ok) return res.json();
            return Promise.reject(new Error(res.status));
        })
        .catch((err) => Promise.reject(new Error(err.message)));
    }

    getCards() {
        return fetch('https://nomoreparties.co/cohort10/cards', {
            headers: {
                authorization: '7a45e0e5-9273-458c-8551-b84f43589b7b'
            }
        })
        .then((res) => {
            if (res.ok) return res.json();
            return Promise.reject(new Error(res.status));
        })
        .catch((err) => Promise.reject(new Error(err.message)));
    }

    patchUserInfo(userName, userAbout) {
        return fetch('https://nomoreparties.co/cohort10/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '7a45e0e5-9273-458c-8551-b84f43589b7b',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${userName}`,
                about: `${userAbout}`
            })
        })
        .then((res) => {
            if (res.ok) return  res.json();
            return Promise.reject(new Error(res.status));
        })
        .catch((err) => Promise.reject(new Error(err.message)));
    }

    postNewCard(name, link) {
        return fetch('https://nomoreparties.co/cohort10/cards', {
            method: 'POST',
            headers: {
                authorization: '7a45e0e5-9273-458c-8551-b84f43589b7b',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${name}`,
                link: `${link}`
            })
        })
        .then((res) => {
            if (res.ok) return res.json();
            return Promise.reject(new Error(res.status));
        })
        .catch((err) => Promise.reject(new Error(err.message)));
    }

}