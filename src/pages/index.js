import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import './index.css';
import { editFormElement, addFormElement,avatarEditFormElement, editPopupOpenButton, addPopupOpenButton, formName, formDescription,avatar, config } from '../utils/constants.js';


const imagePopup = new PopupWithImage(".popup_assignment_card");



const api = new Api({ baseURL: 'https://mesto.nomoreparties.co/v1/cohort36', authorization: 'a4b67e43-7921-4ffc-97a3-90eb387a74ab' });

function createCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      imagePopup.open(item.link, item.name);
    },
    handleDeleteButtonClick: () => {
      const deletePopup = new PopupWithForm('.popup_assignment_delete', '.form_task_delete', 
        (evt) => {
          evt.preventDefault();
          api.deleteCard(item.cardID);
          document.getElementById(`${item.cardID}`).remove();
          deletePopup.close();
        });
      deletePopup.open();
    },
    handleLikeButtonClick: () => {
      
      if (!document.getElementById(`${item.cardID}`).childNodes[3].childNodes[3].childNodes[1].classList.contains('element__like-button_active')){
        api.like(item.cardID).then((res)=>{
          document.getElementById(`${item.cardID}`).childNodes[3].childNodes[3].childNodes[3].textContent=`${res.likes.length}`;
        });
      }
      else {
        api.unlike(item.cardID).then((res)=>{
          document.getElementById(`${item.cardID}`).childNodes[3].childNodes[3].childNodes[3].textContent=`${res.likes.length}`;
        });
      }
      document.getElementById(`${item.cardID}`).childNodes[3].childNodes[3].childNodes[1].classList.toggle('element__like-button_active');
    },
    handleErrorCardClick: () => {
      imagePopup.openOnError();
    }
  }, '#element');
  const cardElement = card.generateCard();
  return cardElement;
}

const cardSection = new Section({
  items: api.getInitialCards(),
  renderer: (item) => {
    const cardElement = createCard(item);
    cardSection.addItem(cardElement);
  },
  newCardRenderer: (item) => {
    const cardElement = createCard(item);
    cardSection.addNewItem(cardElement);
  }
}, ".elements");

cardSection.renderItems();




const editFormValidator = new FormValidator(config, editFormElement);
const addFormValidator = new FormValidator(config, addFormElement);
const avatarEditFormValidator = new FormValidator(config, avatarEditFormElement);

const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userDescriptionSelector: '.profile__description',
  userAvatarSelector: '.profile__avatar'
})


const avatarEditPopup = new PopupWithForm('.popup_assignment_avatar-edit', '.form_task_avatar-edit'
  , (evt) => {
    evt.preventDefault();
    api.patchAvatarInfo(avatarEditPopup._getInputValues()[0]);
    userInfo.setUserAvatar(avatarEditPopup._getInputValues()[0]);
    avatarEditPopup.close();
  })

const editPopup = new PopupWithForm('.popup_assignment_edit', '.form_task_edit'
  , (evt) => {
    evt.preventDefault();
    api.patchUserInfo(editPopup._getInputValues()[0], editPopup._getInputValues()[1]);
    userInfo.setUserInfo(editPopup._getInputValues()[0], editPopup._getInputValues()[1])
    editPopup.close();
  })

const addPopup = new PopupWithForm('.popup_assignment_add', '.form_task_add',
  (evt) => {
    evt.preventDefault();
    api.postNewCard(addPopup._getInputValues()[0], addPopup._getInputValues()[1])
        .then((res) => {
          cardSection.newCardRenderer({link: res.link,name: res.name, likes: res.likes, cardID: res._id, owner: res.owner._id});
        })
    addPopup.close();
  })

function insertUserInfoIntoPopup() {
  api.getUserInfo()
    .then((res) => {
      formName.value = res.name;
      formDescription.value = res.about;
    });
}

api.setUserInfo();
editPopupOpenButton.addEventListener('click', () => {
  insertUserInfoIntoPopup();
  editFormValidator.resetValidation();
  editPopup.open();
});
addPopupOpenButton.addEventListener('click', () => {
  addFormValidator.resetValidation();
  addPopup.open();
});
avatar.addEventListener('click', () => {
  avatarEditFormValidator.resetValidation();
  avatarEditPopup.open();
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarEditFormValidator.enableValidation();