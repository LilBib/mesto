import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import './index.css';
import errorImage from "../images/imgonerror.png";
import { editFormElement, addFormElement, avatarEditFormElement, editPopupOpenButton, addPopupOpenButton, formName, formDescription, avatar, config } from '../utils/constants.js';

const api = new Api({
  baseURL: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: {
    authorization: 'a4b67e43-7921-4ffc-97a3-90eb387a74ab',
    'Content-Type': 'application/json'
  }
});

let userID;
let deleteCardID;
let cardSection;




const imagePopup = new PopupWithImage(".popup_assignment_card", errorImage);


let deletePopup = new PopupWithForm('.popup_assignment_delete',
  (evt) => {
    evt.preventDefault();
    api.deleteCard(deleteCardID)
      .then((res)=>{
        document.getElementById(`${deleteCardID}`).remove();
        deletePopup.close();
        deleteCardID = null
      })
      .catch(err=>{console.log(err)});
    });



function createCard(item) {
  const card = new Card({
    errorImage,
    data: item,
    userID: userID,
    handleCardClick: () => {
      imagePopup.open(item.link, item.name);
    },
    handleDeleteButtonClick: () => {
      deleteCardID = item.cardID
      deletePopup.open();
    },
    handleErrorCardClick: () => {
      imagePopup.openOnError();
    },
    likeRequest: () => {
      if (!card.isLikedCurrently()) {
        return api.like(item.cardID).catch(err=>{console.log(err)})
      }
      else {
        return api.unlike(item.cardID).catch(err=>{console.log(err)})
      }
    },
  }, '#element');
  const cardElement = card.generateCard();
  return cardElement;
}


Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userID = userData._id;
    cardSection = new Section({
      items: cards,
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
  })
  .catch((err) => { console.log(err) });




const editFormValidator = new FormValidator(config, editFormElement);
const addFormValidator = new FormValidator(config, addFormElement);
const avatarEditFormValidator = new FormValidator(config, avatarEditFormElement);

const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userDescriptionSelector: '.profile__description',
  userAvatarSelector: '.profile__avatar'
})


const avatarEditPopup = new PopupWithForm('.popup_assignment_avatar-edit',
  (evt) => {
    evt.preventDefault();
    const avatarSubmitButton = document.querySelector('.form__button_type_avatar-edit');
    avatarSubmitButton.value = "Cохранение...";
    let popupInputs = avatarEditPopup.getInputValues();
    api.patchAvatarInfo(popupInputs.link).then((res) => {
      userInfo.setUserAvatar(popupInputs.link);
      avatarEditPopup.close();
      return res;
    })
      .catch((err) => { console.log(err) })
      .finally(() => {
        avatarSubmitButton.value = "Cохранить";
      });


  })

const editPopup = new PopupWithForm('.popup_assignment_edit',
  (evt) => {
    evt.preventDefault();
    const profileSubmitButton = document.querySelector('.form__button_type_edit');
    profileSubmitButton.value = "Cохранение...";
    let popupInputs = editPopup.getInputValues();
    api.patchUserInfo(popupInputs.name, popupInputs.description)
      .then((res) => {
        userInfo.setUserInfo(popupInputs.name, popupInputs.description);
        document.querySelector('.profile__description').textContent = res.about;
        document.querySelector('.profile__title').textContent = res.name;
        document.querySelector('.profile__avatar').src = res.avatar;
        editPopup.close();
      })
      .catch((err) => { console.log(err) })
      .finally(() => {
        profileSubmitButton.value = "Cохранить";
      })
  })

const addPopup = new PopupWithForm('.popup_assignment_add',
  (evt) => {
    evt.preventDefault();
    const newCardSubmitButton = document.querySelector('.form__button_type_add')
    newCardSubmitButton.value = "Cоздание...";
    let popupInputs = addPopup.getInputValues()
    api.postNewCard(popupInputs.place, popupInputs.link)
      .then((res) => {
        cardSection.newCardRenderer({ link: res.link, name: res.name, likes: res.likes, cardID: res._id, owner: res.owner._id });
        addPopup.close();
      })
      .catch((err) => { console.log(err) })
      .finally(() => {
        newCardSubmitButton.value = "Cоздать"
      })

  })

function insertUserInfoIntoPopup() {
  formName.value = userInfo.getUserInfo().name;
  formDescription.value = userInfo.getUserInfo().description;
}

api.setUserInfo()
  .then((res) => {
    document.querySelector('.profile__description').textContent = res.about;
    document.querySelector('.profile__title').textContent = res.name;
    document.querySelector('.profile__avatar').src = res.avatar;
  })
  .catch((err) => { console.log(err) });

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



