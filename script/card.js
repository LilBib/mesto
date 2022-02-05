import {openPopup,closePopup} from './index.js'
const popupImage = document.querySelector('.popup__image');
const cardPopup = document.querySelector('.popup_assignment_card');
export class Card {
    constructor(data, templateSelector) {
        this._name=data.name;
        this._link=data.link;
        this._templateSelector=templateSelector;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    _callbackOnError () {
        this._element.querySelector('.element__card').setAttribute('src', './images/imgonerror.png');
    }

    _setEventListeners() {
        this._element.querySelector('.element__card').addEventListener('click',()=>{
            this._openPopup();});
        this._element.querySelector('.element__card').addEventListener('error', ()=>{
            this._callbackOnError()});
        this._element.querySelector('.element__delete-button').addEventListener('click', function(evt){
            evt.target.closest('.element').remove();
        });
        this._element.querySelector('.element__like-button').addEventListener('click', this._like);
    }

    _like(evt) {
        evt.target.classList.toggle('element__like-button_active');
    }

    _openPopup() {
        openPopup(cardPopup);
        popupImage.src=this._link;
        popupImage.setAttribute('alt',`${this._name}`);
        cardPopup.querySelector('.popup__caption').textContent=this._name;
    }

    _closePopup() {
        closePopup(cardPopup);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__card').src=this._link;
        this._element.querySelector('.element__description').textContent=this._name;
        this._element.querySelector('.element__card').setAttribute('alt',`${this._name}`);
        this._setEventListeners();
        return this._element;
    }
    
}