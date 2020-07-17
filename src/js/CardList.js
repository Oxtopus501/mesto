export class CardList {
    constructor(container, cardsArray) {
        this.container = container;
        this.cardsArray = cardsArray;
    }

    //для добавления карточки в список, принимает на вход экземпляр карточки
    addCard(card) {
      this.cardsArray.push(card);
      this.container.appendChild(card);
    }

    //для отрисовки карточек при загрузке страницы
    render() {
      this.cardsArray.forEach((item) => {
         this.container.appendChild(item);
      });
    }
}
