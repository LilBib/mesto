let formElement=document.querySelector('.form');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-icon');
let popup = document.querySelector('.popup');
let formName= document.querySelector('.form__item-name');
let formDescription = document.querySelector('.form__item-description');
let likeButtons = document.querySelectorAll('.element__like-button');


function togglePopup() {
    formName.value=document.querySelector('.profile__title').textContent;
    formDescription.value=document.querySelector('.profile__description').textContent;
    if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
    }
    else {
        popup.classList.add('popup_opened');
    }
}
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    document.querySelector('.profile__title').textContent=formName.value;
    document.querySelector('.profile__description').textContent=formDescription.value
    togglePopup();
}
function toggleLike(evt) {
    if (evt.target.getAttribute('src')==="images/like.svg") {
        evt.target.setAttribute('src',"images/like_active.svg");
        
    }
    else {
        evt.target.setAttribute('src',"images/like.svg");
    }
}

formElement.addEventListener('submit', formSubmitHandler); 
popupOpenButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);
for (let i=0; i<likeButtons.length; ++i) {
    likeButtons[i].addEventListener('click', toggleLike);
}