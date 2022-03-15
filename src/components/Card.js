

export class Card {
    constructor({errorImage,data,userID, handleCardClick,handleDeleteButtonClick, likeRequest}, templateSelector) {
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
        this._likeRequest=likeRequest;
        this._popupImage = document.querySelector('.popup__image');
        this._cardPopup = document.querySelector('.popup_assignment_card');
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    _callbackOnError () {
        this._card.setAttribute('src', this._errorImage);
    }

    isLiked () {
        return (this._likes.some(like => {
            return like._id===this._userID;
        }))
    }
    isLikedCurrently () {
        return this._likeButton.classList.contains('element__like-button_active');
    }

    _handleLikeButtonClick () {
        this._likeRequest()
        .then((res)=>{
            this._likesCounter.textContent=`${res.likes.length}`;
            this._likeButton.classList.toggle('element__like-button_active');
        })
        .catch((err)=>{console.log(err)});
    }

    _setEventListeners() {
        this._card.addEventListener('click',()=>{
            this._handleCardClick();});
        this._card.addEventListener('error', ()=>{
            this._callbackOnError()});
        this._element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
        this._handleDeleteButtonClick(evt)});
        this._likeButton.addEventListener('click', this._handleLikeButtonClick.bind(this));
    }

    
    _isOwner () {
        return (this._cardOwner===this._userID);
    }


    generateCard() {
        this._element = this._getTemplate();
        this._likeButton=this._element.querySelector('.element__like-button');
        this._card=this._element.querySelector('.element__card');
        this._likesCounter=this._element.querySelector('.element__like-count');
        this._card.src=this._link;
        this._element.querySelector('.element__description').textContent=this._name;
        this._card.setAttribute('alt',`${this._name}`);
        this._likesCounter.textContent = this._likes.length;
        this._element.setAttribute("id",`${this._cardID}`);
        this._setEventListeners();
        const isLiked = this.isLiked();
        if (isLiked) {
            this._likeButton.classList.add('element__like-button_active');
        }
        const isOwner=this._isOwner();
        if (!isOwner) {
            this._element.querySelector('.element__delete-button').setAttribute('class','element__delete-button_disabled');
        }
        return this._element;
    }
    
}