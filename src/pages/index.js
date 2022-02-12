import { Card } from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import './index.css';
import {editFormElement,addFormElement, editPopupOpenButton, addPopupOpenButton, formName, formDescription, formPlace, formLink, initialCards, config} from '../utils/constants.js';



const imagePopup = new PopupWithImage (".popup_assignment_card");


function createCard(item) {
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
  return cardElement;
}


const cardSection = new Section ({
  items:initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
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
  userInfo.setUserInfo(editPopup.getInputValues()[0], editPopup.getInputValues()[1]);
  editPopup.close();
})

const addPopup = new PopupWithForm('.popup_assignment_add','.form_task_add',
(evt)=>{
  evt.preventDefault();
  cardSection.renderer({name: addPopup.getInputValues()[0], link: addPopup.getInputValues()[1]});
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