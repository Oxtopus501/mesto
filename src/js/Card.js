export class Card {
  constructor(name, link, likes) {
    this.name = name;
    this.link = link;
    this.likes = likes;
  }

  /*Создаёт DOM-элемент карточки из экземпляра класса Card
    Добавляет слушатели like и remove;
  */
  create(container, picturePopup) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('place-card');

    const cardImage = document.createElement('div');
    cardImage.classList.add('place-card__image');
    cardImage.setAttribute('style',`background-image: url(${this.link})`);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('place-card__delete-icon');

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('place-card__description');

    const cardName = document.createElement('h3');
    cardName.classList.add('place-card__name');
    cardName.textContent = this.name;

    //Добавил контейнер
    const likeContainer = document.createElement('div');
    likeContainer.classList.add('place-card__like-container');

    const likeButton = document.createElement('button');
    likeButton.classList.add('place-card__like-icon');

    //Добавил счётчик лайков 
    const likeCounter = document.createElement('p');
    likeCounter.classList.add('place-card__like-counter');
    likeCounter.innerHTML = this.likes.length;
    
    likeContainer.appendChild(likeButton);
    likeContainer.appendChild(likeCounter);

    cardImage.appendChild(deleteButton);
    cardDescription.appendChild(cardName);
    //В дескрипшн добавляем теперь не likeButton, а контейнер с кнопкой и лайкометром
    //cardDescription.appendChild(likeButton);
    cardDescription.appendChild(likeContainer);

    cardElement.appendChild(cardImage);
    cardElement.appendChild(cardDescription);

    cardElement.addEventListener('click', event => {
      if (event.target.classList.contains('place-card__like-icon')) {
        this.like(event);
        return;
      }
      if (event.target.classList.contains('place-card__delete-icon')) {
        this.remove(event, container);
        return;
      }
      if (event.target.classList.contains('place-card__image')) {
        // Можно лучше: picturePopup лучше передавать в конструкторе, так как он не меняется при каждом вызове create.
        picturePopup.open('card', event);
      }
    });

    return cardElement;
  }

  like(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
      event.target.classList.toggle('place-card__like-icon_liked');
    }
  }

  remove(event, container) {
    if (event.target.classList.contains('place-card__delete-icon')) {
      // Можно лучше: лучше избегать прямого использования глобального эксземпляра класса, аналогично popup выше.
      // Можно лучше: Нужный элемент выше по дереву можно найти с помощью:
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
      // Метод станет более универсальным и не будет зависеть от уровня вложенности элемента.
      container.removeChild(event.target.parentElement.parentElement);
    }
  }

}
