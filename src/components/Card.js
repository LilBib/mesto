const popupImage = document.querySelector('.popup__image');
const cardPopup = document.querySelector('.popup_assignment_card');

export class Card {
    constructor({errorImage,data,userID, handleCardClick,handleDeleteButtonClick, handleErrorCardClick, likeRequest}, templateSelector) {
        this._name=data.name;
        this._link=data.link;
        this._likes = data.likes;
        this._cardID=data.cardID;
        this._cardOwner=data.owner;
        this._userID=userID;
        this._errorImage=errorImage;
        this._templateSelector=templateSelector;
        this._handleCardClick= handleCardClick;
        this._handleDeleteButtonClick = handleDeleteButtonClick;
        this._handleErrorCardClick = handleErrorCardClick;
        this._likeRequest=likeRequest;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    _callbackOnError () {
        this._element.querySelector('.element__card').setAttribute('src', this._errorImage);
    }

    isLiked () {
        return (this._likes.some(like => {
            return like._id===this._userID;
        }))
    }
    isLikedCurrently () {
        return this._element.querySelector('.element__like-button').classList.contains('element__like-button_active');
    }

    _handleLikeButtonClick () {
        this._likeRequest()
        .then((res)=>{this._element.querySelector('.element__like-count').textContent=`${res.likes.length}`})
        .catch((err)=>{console.log(err)});
        this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }

    _setEventListeners() {
        this._element.querySelector('.element__card').addEventListener('click',()=>{
            this._handleCardClick();});
        this._element.querySelector('.element__card').addEventListener('error', ()=>{
            this._callbackOnError()});
        this._element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
        this._handleDeleteButtonClick(evt)});
        this._element.querySelector('.element__like-button').addEventListener('click', this._handleLikeButtonClick.bind(this));
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
        return (this._cardOwner===this._userID);
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
            this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
        }
        const isOwner=this._isOwner();
        if (!isOwner) {
            this._element.querySelector('.element__delete-button').setAttribute('class','element__delete-button_disabled');
        }
        return this._element;
    }
    
}