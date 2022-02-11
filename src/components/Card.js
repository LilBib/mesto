import errorImage from "../images/imgonerror.png";
const popupImage = document.querySelector('.popup__image');
const cardPopup = document.querySelector('.popup_assignment_card');

export class Card {
    constructor({data, handleCardClick, handleErrorCardClick}, templateSelector) {
        this._name=data.name;
        this._link=data.link;
        this._templateSelector=templateSelector;
        this._handleCardClick= handleCardClick;
        this._handleErrorCardClick = handleErrorCardClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    _callbackOnError () {
        this._element.querySelector('.element__card').setAttribute('src', errorImage);
    }

    _popupCallbackOnError () {
        popupImage.src=errorImage;
        popupImage.setAttribute('alt',`img loading error`);
    }

    _setEventListeners() {
        this._element.querySelector('.element__card').addEventListener('click',()=>{
            this._handleCardClick();});
        this._element.querySelector('.element__card').addEventListener('error', ()=>{
            this._callbackOnError()});
        this._element.querySelector('.element__delete-button').addEventListener('click', function(evt){
            evt.target.closest('.element').remove();
        });
        this._element.querySelector('.element__like-button').addEventListener('click', this._like);
        popupImage.addEventListener('error',()=>{
            this._handleErrorCardClick();
        });
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