import { Card } from "./card.js";
import {FormValidator} from "./validate.js";
const editFormElement = document.querySelector('.form_task_edit');
const addFormElement = document.querySelector('.form_task_add');
const editPopupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButtons = document.querySelectorAll('.popup__close-icon');
const addPopupOpenButton = document.querySelector('.profile__add-button');
const formName = document.querySelector('.form__item_section_name');
const formDescription = document.querySelector('.form__item_section_description');
const formPlace = document.querySelector('.form__item_section_place');
const formLink = document.querySelector('.form__item_section_link');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardPopup = document.querySelector('.popup_assignment_card');
const editPopup = document.querySelector('.popup_assignment_edit');
const addPopup = document.querySelector('.popup_assignment_add');
const elements = document.querySelector('.elements');
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
const config = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
}

function renderElements () {
    initialCards.forEach((item) => {
        addElement(item);
    }); 
}


formName.value = profileTitle.textContent;
formDescription.value = profileDescription.textContent;



function addElement (data) {
  const card = new Card(data, '#element');
  const cardElement = card.generateCard()
  elements.prepend(cardElement);   
}

function popupOverlayCallback(evt){
  if (evt.target.classList.contains('popup')) {
    closePopup();
  }
}

function popupEscCallback(evt) {
  if (evt.key == 'Escape') {
    closePopup();
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click',  popupOverlayCallback);
  window.addEventListener('keydown', popupEscCallback );
  }

export function closePopup() {
  const openedPopup = document.querySelector('.popup_opened')
  if (openedPopup) {
    openedPopup.classList.remove('popup_opened');
  }
    openedPopup.removeEventListener('click', popupOverlayCallback);
    window.removeEventListener('keydown', popupEscCallback);
}

function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = formName.value;
    profileDescription.textContent = formDescription.value;
    closePopup();
}

function addFormSubmitHandler(evt) {
    evt.preventDefault();
    console.log(formPlace.value);
    addElement({name: formPlace.value,link: formLink.value});
    closePopup();
}
function disableAddButton() {
  const buttonElement = document.querySelector('.form__button_type_add');
  buttonElement.classList.add('form__button_disabled');
  buttonElement.setAttribute('disabled', 'disabled');
};

const editFormValidator = new FormValidator(config,editFormElement);
const addFormValidator = new FormValidator(config, addFormElement);


renderElements();
editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);
editPopupOpenButton.addEventListener('click', ()=> {openPopup(editPopup)});
addPopupOpenButton.addEventListener('click', () => {
  addFormElement.reset();
  disableAddButton();
  openPopup(addPopup);
});
popupCloseButtons.forEach(function (item){
  item.addEventListener('click', closePopup);
});
editFormValidator.enableValidation();
addFormValidator.enableValidation();