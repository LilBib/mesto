let editFormElement = document.querySelector('.form');
let addFormElement = document.querySelector('.add-form');
let editPopupOpenButton = document.querySelector('.profile__edit-button');
let editPopupCloseButton = document.querySelector('.edit-popup__close-icon');
let editPopup = document.querySelector('.edit-popup');
let addPopupOpenButton = document.querySelector('.profile__add-button');
let addPopupCloseButton = document.querySelector('.add-popup__close-icon');
let addPopup = document.querySelector('.add-popup');
let formName = document.querySelector('.form__item_section_name');
let formDescription = document.querySelector('.form__item_section_description');
let formPlace = document.querySelector('.form__item_section_place');
let formLink = document.querySelector('.form__item_section_link');
let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');
let elements = document.querySelector('.elements');
let cardPopup=document.querySelector('.card-popup');
let cardPopupCloseButton=document.querySelector('.card-popup__close-icon');
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

function renderElements () {
    initialCards.forEach(function(item) {
        addElement(item.name, item.link);
    }); 
}


function addElement (name, link) {
    const cardTemplate = document.querySelector('#element').content;
    const cardElement= cardTemplate.querySelector('.element').cloneNode(true);
    const elements=document.querySelector('.elements');
    cardElement.querySelector('.element__card').src=link;
    cardElement.querySelector('.element__description').textContent=name;
    elements.append(cardElement);

    cardElement.querySelector('.element__like-button').addEventListener('click', function(evt){
        evt.target.classList.toggle('element__like-button_active');
    });
    cardElement.querySelector('.element__delete-button').addEventListener('click', function(evt){
        evt.target.closest('.element').remove();
    });
    cardElement.querySelector('.element__card').addEventListener('click', function(evt){
        cardPopup.classList.add('card-popup_opened');
        cardPopup.querySelector('.card-popup__image').setAttribute('src',link);
        cardPopup.querySelector('.card-popup__caption').textContent=name;
    });
}

function openEditPopup() {
    formName.value = profileTitle.textContent;
    formDescription.value = profileDescription.textContent;
    editPopup.classList.add('edit-popup_opened');
}
function openAddPopup() {
    addPopup.classList.add('add-popup_opened');
}

function closeEditPopup() {
    editPopup.classList.remove('edit-popup_opened');
}
function closeAddPopup() {
    addPopup.classList.remove('add-popup_opened');
}
function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = formName.value;
    profileDescription.textContent = formDescription.value
    closeEditPopup();
}
function addFormSubmitHandler(evt) {
    evt.preventDefault();
    addElement(formPlace.value,formLink.value);
    closeAddPopup();
    evt.target.reset();
}
function closeCardPopup() {
    cardPopup.classList.remove('card-popup_opened');
}


renderElements();
editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);
editPopupOpenButton.addEventListener('click', openEditPopup);
addPopupOpenButton.addEventListener('click', openAddPopup);
editPopupCloseButton.addEventListener('click', closeEditPopup);
addPopupCloseButton.addEventListener('click', closeAddPopup);
cardPopupCloseButton.addEventListener('click', closeCardPopup);


    
