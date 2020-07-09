class Api {
    constructor() {

    }

    getUserInfo() {
        /*
            Можно лучше: не нужно хардкодить адрес сервера и ключ авторизации в каждом запросе
            Лучше передать их в конструктор и использовать переданные. 
            При этом итоговый адрес запроса собирается из адреса сервера и адреса ендпоинта:
            fetch(`${this.baseUrl}/users/me`
        */
        return fetch('http://praktikum.tk/cohort10/users/me', {
            headers: {
                authorization: '7a45e0e5-9273-458c-8551-b84f43589b7b'
            }
        })
        .then((res) => {
            /*
            Можно лучше: проверка ответа сервера и преобразование из json
            дублируется во всех методах класса Api, лучше вынести в отдельный метод:
                _getResponseData(res) {
                    if (!res.ok) {
                        return Promise.reject(`Ошибка: ${res.status}`); 
                    }
                    return res.json();
                }
            Подчеркивание в начале имени метода говорит о том, что метод является приватным, т.е.
            не используется вне класса Api   
            */
            if (res.ok) return res.json();
            return Promise.reject(new Error(res.status));
        })
        .catch((err) => Promise.reject(new Error(err.message)));
    }

    getCards() {
        return fetch('https://praktikum.tk/cohort10/cards', {
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
        return fetch('https://praktikum.tk/cohort10/users/me', {
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
        return fetch('https://praktikum.tk/cohort10/cards', {
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