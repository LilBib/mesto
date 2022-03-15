import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector,  submitFormHandler) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._submitFormHandler = submitFormHandler;
        this._formInputs = this._form.querySelectorAll('.form__item');
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitFormHandler)
    }
    removeEventListeners() {
        super.removeEventListeners();
        this._form.removeEventListener('submit', this._submitFormHandler);
    }
    close() {
        super.close();
        this._form.reset();
    }
    getInputValues() {
        this._inputValues = {};
        this._formInputs.forEach((input)=>{
            this._inputValues[input.name]=input.value;
        })
        return this._inputValues;
    }
}