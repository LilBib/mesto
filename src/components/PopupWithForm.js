import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, formSelector, submitFormHandler) {
        super(popupSelector);
        this._form = document.querySelector(formSelector);
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
        const inputValues=[];
        this._formInputs.forEach((input,i)=>{
            inputValues[i]=input.value;
        })
        return inputValues;
    }
}