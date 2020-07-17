export class FormValidator {
    constructor(formElement){
        this.formElement = formElement;
    }

    checkInputValidity(inputElem, errorElem) {
        if (inputElem.value.length === 0) {
            errorElem.textContent = 'Это обязательное поле';
            errorElem.classList.remove('popup__error_hidden');
            return false;
        }

        if (inputElem.name !== 'link') {
            if (inputElem.value.length < 3 || inputElem.value.length > 30) {
                errorElem.textContent = 'Должно быть от 3 до 30 символов';
                errorElem.classList.remove('popup__error_hidden');
                return false;
            }
        }

        errorElem.classList.add('popup__error_hidden');
        return true;
    }

    setSubmitButtonState(button, validity) {
        if (validity) {
            button.classList.add('popup__button_active');
            button.removeAttribute('disabled');
        } else {
            button.classList.remove('popup__button_active');
            button.setAttribute('disabled', '');
        }
    }

    setEventListeners() {
        const form = this.formElement;
        form.addEventListener('input', () => {
            const errorElements = Array.from(form.querySelectorAll('.popup__error'));
            const inputs = Array.from(form.elements);
            let isValid = true;
            inputs.forEach((elem, index) => {
                if (!elem.classList.contains('button')) {
                    const factor = this.checkInputValidity(elem, errorElements[index]);
                    isValid = isValid && factor;
                } else this.setSubmitButtonState(elem, isValid);
            });
        });
    }
}
