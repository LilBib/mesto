let formElement=document.querySelector('.form');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-icon');
let popup = document.querySelector('.popup');
let formName= document.querySelector('.form__item-name');
let formDescription = document.querySelector('.form__item-description');
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

formElement.addEventListener('submit', formSubmitHandler); 
popupOpenButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);