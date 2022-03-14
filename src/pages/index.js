import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import './index.css';
import errorImage from "../images/imgonerror.png";
import { editFormElement, addFormElement,avatarEditFormElement, editPopupOpenButton, addPopupOpenButton, formName, formDescription,avatar, config } from '../utils/constants.js';

const api = new Api({ baseURL: 'https://mesto.nomoreparties.co/v1/cohort36', authorization: 'a4b67e43-7921-4ffc-97a3-90eb387a74ab' });

let userID;
api.getUserInfo()
    .then((res)=>{return res._id})
    .then((res)=>{userID=res})
    .catch((err)=>{console.log(err)});


const imagePopup = new PopupWithImage(".popup_assignment_card", errorImage);





function createCard(item) {
  const card = new Card({
    errorImage,
    data: item,
    userID : userID,
    handleCardClick: () => {
      imagePopup.open(item.link, item.name);
    },
    handleDeleteButtonClick: () => {
      let deletePopup = new PopupWithForm('.popup_assignment_delete', '.form_task_delete', 
        (evt) => {
          evt.preventDefault();
          api.deleteCard(item.cardID);
          document.getElementById(`${item.cardID}`).remove();
          deletePopup.close();
        });
      deletePopup.open();
    },
    handleErrorCardClick: () => {
      imagePopup.openOnError();
    },
    likeRequest: () => {
      if(!card.isLikedCurrently()){
        return api.like(item.cardID)
      }
      else {
        return api.unlike(item.cardID)
      }
    },
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
    document.querySelector('.form__button_type_avatar-edit').value="Cохранение...";
    api.patchAvatarInfo(avatarEditPopup.getInputValues()[0]).then((res)=> {
      if(res.ok) {
        userInfo.setUserAvatar(avatarEditPopup.getInputValues()[0]);
      }
      else{
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    }).catch((err)=>{console.log(err)})
      .finally(() => {
        avatarEditPopup.close();
        document.querySelector('.form__button_type_avatar-edit').value="Cохранить";
      });
    
    
  })

const editPopup = new PopupWithForm('.popup_assignment_edit', '.form_task_edit'
  , (evt) => {
    evt.preventDefault();
    document.querySelector('.form__button_type_edit').value="Cохранение...";
    api.patchUserInfo(editPopup.getInputValues()[0], editPopup.getInputValues()[1])
      .then(()=>{
        userInfo.setUserInfo(editPopup.getInputValues()[0], editPopup.getInputValues()[1])
      })
      .catch((err)=> {console.log(err)})
      .finally(()=> {
        editPopup.close();
        document.querySelector('.form__button_type_edit').value="Cохранить";
      })
  })

const addPopup = new PopupWithForm('.popup_assignment_add', '.form_task_add',
  (evt) => {
    evt.preventDefault();
    document.querySelector('.form__button_type_add').value="Cоздание..."
    api.postNewCard(addPopup.getInputValues()[0], addPopup.getInputValues()[1])
        .then((res) => {
          cardSection.newCardRenderer({link: res.link,name: res.name, likes: res.likes, cardID: res._id, owner: res.owner._id});
        })
        .catch((err)=>{console.log(err)})
        .finally(()=>{
          addPopup.close();
          document.querySelector('.form__button_type_add').value="Cоздать"
        })
    
  })

function insertUserInfoIntoPopup() {
  api.getUserInfo()
    .then((res) => {
      formName.value = res.name;
      formDescription.value = res.about;
    })
    .catch((err)=>{console.log(err)});
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
cardSection.renderItems();