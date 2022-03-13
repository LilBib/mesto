import errorImage from "../images/imgonerror.png";
const popupImage = document.querySelector('.popup__image');
const cardPopup = document.querySelector('.popup_assignment_card');

export class Card {
    constructor({data, handleCardClick,handleDeleteButtonClick,handleLikeButtonClick, handleErrorCardClick}, templateSelector) {
        this._name=data.name;
        this._link=data.link;
        this._likes = data.likes;
        this._cardID=data.cardID;
        this._cardOwner=data.owner;
        this._myID='e729488d8993188bc53320a2';
        this._templateSelector=templateSelector;
        this._handleCardClick= handleCardClick;
        this._handleDeleteButtonClick = handleDeleteButtonClick;
        this._handleLikeButtonClick = handleLikeButtonClick;
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
        this._element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
        this._handleDeleteButtonClick(evt)});
        this._element.querySelector('.element__like-button').addEventListener('click', this._handleLikeButtonClick);
        popupImage.addEventListener('error',()=>{
            this._handleErrorCardClick();
        });
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

    _isOwner () {
        return (this._cardOwner===this._myID);
    }

    isLiked () {
        return (this._likes.some(like => {
            return like._id===this._myID;
        }))
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__card').src=this._link;
        this._element.querySelector('.element__description').textContent=this._name;
        this._element.querySelector('.element__card').setAttribute('alt',`${this._name}`);
        this._element.querySelector('.element__like-count').textContent = this._likes.length;
        this._element.setAttribute("id",`${this._cardID}`);
        this._setEventListeners();
        const isLiked = this.isLiked();
        if (isLiked) {
            this._element.childNodes[3].childNodes[3].childNodes[1].classList.toggle('element__like-button_active');
        }
        const isOwner=this._isOwner();
        if (!isOwner) {
            this._element.querySelector('.element__delete-button').setAttribute('class','element__delete-button_disabled');
        }
        return this._element;
    }
    
}