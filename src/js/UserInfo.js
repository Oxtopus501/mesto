export class UserInfo {
    constructor(name, about) {
        this.userData = {
            name: name,
            about: about,
        }

    }

    //Обновляет данные внутри экземпляра класса
    setUserInfo(userData) {
        this.userData = userData;
    }

    //Отображает данные на странице
    
    updateUserInfo(nameElement, aboutElement, nameField, aboutField) {
        nameElement.textContent = this.userData.name;   //nameElement - DOM-элемент, отображающий имя на странице ( класс('.user-info__name'))
        aboutElement.textContent = this.userData.about; //aboutElement - DOM-элемент, отображающий дополнительную информацию о пользователе на странице ( класс('.user-info__job'))
        nameField.value = this.userData.name;           //nameField - форма редактирования профиля/поле имени
        aboutField.value = this.userData.about;         //aboutField - форма редактирования профиля/поле доп. инфы
    }
}