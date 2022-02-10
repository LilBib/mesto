import { Card } from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {PopupWithImage} from "./PopupWithImage.js";
import { Section } from "./Section.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import './pages/index.css';

const editFormElement = document.querySelector('.form_task_edit');
const addFormElement = document.querySelector('.form_task_add');
const editPopupOpenButton = document.querySelector('.profile__edit-button');
const addPopupOpenButton = document.querySelector('.profile__add-button');
const formName = document.querySelector('.form__item_section_name');
const formDescription = document.querySelector('.form__item_section_description');
const formPlace = document.querySelector('.form__item_section_place');
const formLink = document.querySelector('.form__item_section_link');
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

const imagePopup = new PopupWithImage (".popup_assignment_card");


const cardSection = new Section ({
  items:initialCards,
  renderer: (item) => {
    const card = new Card({
      data:item,
      handleCardClick : () => {
        imagePopup.open(item.link,item.name) ;
      },
      handleErrorCardClick : () => {
        imagePopup.openOnError();
      }
    }, '#element');
    const cardElement = card.generateCard();
    cardSection.addItem(cardElement);
  }
 }, ".elements");
cardSection.renderItems();


const editFormValidator = new FormValidator(config,editFormElement);
const addFormValidator = new FormValidator(config, addFormElement);

const userInfo = new UserInfo({
  userNameSelector:'.profile__title', 
  userDescriptionSelector: '.profile__description'})

const editPopup = new PopupWithForm('.popup_assignment_edit','.form_task_edit'
, (evt)=>{
  evt.preventDefault();
  userInfo.setUserInfo(formName.value, formDescription.value);
  editPopup.close();
})

const addPopup = new PopupWithForm('.popup_assignment_add','.form_task_add',
(evt)=>{
  evt.preventDefault();
  cardSection._renderer({name: formPlace.value,link: formLink.value});
  addPopup.close();
})

editPopupOpenButton.addEventListener('click', ()=> {
  formName.value = userInfo.getUserInfo().name;
  formDescription.value = userInfo.getUserInfo().description;
  editFormValidator.resetValidation();
  editPopup.open();
});
addPopupOpenButton.addEventListener('click', () => {
  addFormValidator.resetValidation();
  addPopup.open();
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();