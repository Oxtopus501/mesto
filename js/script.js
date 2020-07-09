// IIFE
(function () {

 /* Переменные */
const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const userAvatar = document.querySelector('.user-info__photo');
const addButton = document.querySelector('.user-info__button');
const closeFormAdd = document.querySelector('#close-new-place');
const closeFormEdit = document.querySelector('#close-edit-profile');
const closePicture = document.querySelector('#close-picture');
const formAdd = document.forms.new;
const formEdit = document.forms.edit;
const editButton = document.querySelector('.user-info__edit');
const cardsArray = []; //Массив карточек-экземпляров Card (передаём его в конструктор CardList вторым аргументом)
const addFormValidator = new FormValidator(formAdd);
const editFormValidator = new FormValidator(formEdit);
const placesList = document.querySelector('.places-list'); //Контейнер карточек (передаём его в конструктор cardList первым аргументом)
const cardList = new CardList(placesList, cardsArray);
const userInfo = new UserInfo(userName.textContent, userJob.textContent);
const popupAdd = document.querySelector('#popup-add');
const popupEdit = document.querySelector('#popup-edit');
const popupPicture = document.querySelector('#popup-picture');
const popup = new Popup(popupAdd, popupEdit, popupPicture);
const api = new Api();

/*Куча вызовов и слушателей*/

//Старый способ добавления первоначальных карт отключён, ниже вызывается api.getCards();
/*initialCards.forEach(function(item) {
  const card = new Card(item.name, item.link);
  cardsArray.push(card.create(placesList, popup));
});

cardList.render(); */

userInfo.updateUserInfo(userName, userJob, formEdit.elements.name, formEdit.elements.about);

editButton.addEventListener('click', function(){
  formEdit.name.value = userName.textContent;
  formEdit.about.value = userJob.textContent;
  popup.open('edit');
});

addButton.addEventListener('click', function() {
  popup.open('add');
});

closeFormAdd.addEventListener('click', function() {
  formAdd.reset();
  popup.close('add');
});

closeFormEdit.addEventListener('click', function() {
  popup.close('edit');
});

closePicture.addEventListener('click', function() {
  popup.close('card');
});

addFormValidator.setEventListeners()

/*
formAdd.addEventListener('submit', function(event) {
  event.preventDefault();
  const card = new Card(formAdd.name.value, formAdd.link.value);
  cardList.addCard(card.create(placesList, popup));
  formAdd.reset();
  formAdd.querySelector('button').setAttribute('disabled', '');
  popup.close('add');
});
*/

/*formEdit.addEventListener('submit', function(event) {
  event.preventDefault();
  userInfo.setUserInfo(formEdit.elements.name.value, formEdit.elements.about.value);
  userInfo.updateUserInfo(userName, userJob, formEdit.elements.name, formEdit.elements.about);
  popup.close('edit');
});*/


editFormValidator.setEventListeners()

//Загрузка данных пользовтеля:
function getUserInfo() {
  api.getUserInfo()
    .then((data) => {
      userInfo.setUserInfo(data);
      userInfo.updateUserInfo(userName, userJob, formEdit.elements.name, formEdit.elements.about);
      console.log(userInfo.userData._id);
    })
    .catch((err) => console.log(`Ошибка при загрузке данных пользователя: ${err.message}`));
}

//Получаем карточки:
function getCards() {
  api.getCards()
    .then((data) => {
      data.forEach(function(item) {
        const card = new Card(item.name, item.link, item.likes);
        cardsArray.push(card.create(placesList, popup));
      })
    })
    .then(() => {cardList.render()})
    .catch((err) => console.log(`Ошибка при загрузке карточек: ${err.message}`));
  }

//Редактирование профиля 
formEdit.addEventListener('submit', function(event) {
  event.preventDefault();
  api.patchUserInfo(formEdit.elements.name.value, formEdit.elements.about.value)
  .then((data) => {
    userInfo.setUserInfo(data);
    userInfo.updateUserInfo(userName, userJob, formEdit.elements.name, formEdit.elements.about);
    popup.close('edit');
  })
  .catch((err) => console.log(`Ошибка редактирования профиля: ${err.message}`));
})

formAdd.addEventListener('submit', function(event) {
  event.preventDefault();
  api.postNewCard(formAdd.name.value, formAdd.link.value)
    .then((data) => {
      console.log(data);
      placesList.innerHTML = '';
      getCards();
      popup.close('add');
    })
    .catch((err) => console.log(`Ошибка добавления карточки на сервер: ${err.message}`));
})

getUserInfo();
getCards();

})();

/*
  Неплохая работа, данные с сервера приходят и отправляются. Все действия на странице происходят
  после ответа сервера и есть обработка ошибок при запросах
  Но есть несколько замечаний к организации кода:

  Надо исправить:
  - за обновление данных пользователя должен отвечать класс UserInfo
    необходимо доработать его, чтобы он мог принимать все данные пользователя, в том числе и аватар
  - не нужно вызывать getUserInfo и слать запрос ещё раз, в ответ на обновление данных пользователя сервер
    возвращает обновленные данные, нужно использовать их
    
  Можно лучше:
  - не нужно хардкодить адрес сервера и ключ авторизации в каждом запросе
*/


/*
  Отлично, критические замечания исправлены

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.

  Если у Вас будет свободное время попробуйте переписать работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе
*/





// Резюме по работе:
// В целом работа получилась хорошей, код разнесён по классам.
//
// Что понравилось:
// - корректное создание карточки;
// - отслеживание событий input и submit у формы;
// - добавление пользовательского ввода через textContent;
// - присутствуют понятные комментарии в коде.
//
// Что можно улучшить:
// - единообразно форматировать код для всех файлов;
// - добавить больше модульности в файле script.js, сгруппировать код по отдельным IIFE-функциям,
// чтобы инкапсулировать логику, например, формы добавления в одной функции;
// - стараться создавать классы таким, образом, чтобы они ничего не знали о том, что происходит вне их.
// Например, мктод Card.remove может отписываться от событий, удалять элемент (cardElement) созданный ранее
// и вызывать переданный callback для удаления в CardList.cardsArray.
//
// Успехов в дальнейшем обучении!
