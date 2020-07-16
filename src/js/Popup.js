export class Popup {
    constructor(popupAdd, popupEdit, popupPicture) {
        this.popupAdd = popupAdd;
        this.popupEdit = popupEdit;
        this.popupPicture = popupPicture;
    }

    open(trigger, event) {

        if (trigger === 'add') {
            this.currentPopup = this.popupAdd;
        }

        if (trigger === 'edit') {
            this.currentPopup = this.popupEdit;
        }

        if (trigger === 'card') {
            const clickedPicture = event.target;
            this.currentPopup = this.popupPicture;
            const imageToShow = this.currentPopup.querySelector('.popup__image');
            imageToShow.src = clickedPicture.style.backgroundImage.substr(5,(clickedPicture.style.backgroundImage.length - 7));
        }

        this.currentPopup.classList.add('popup_is-opened');

    }

    close(trigger) {
        this.currentPopup.classList.remove('popup_is-opened');
        if (trigger !== 'card') {
            const errors = Array.from(this.currentPopup.querySelectorAll('.popup__error'));
            errors.forEach(function(item) {
                item.classList.add('popup__error_hidden');
            });
        }
        if (trigger === 'add') {
            const submitButton = this.currentPopup.querySelector('.popup__button');
            submitButton.classList.remove('popup__button_active');
        }
    }
}
