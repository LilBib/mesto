let editFormElement = document.querySelector('.form_task_edit');
let addFormElement = document.querySelector('.form_task_add');
let editPopupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelectorAll('.popup__close-icon');
let addPopupOpenButton = document.querySelector('.profile__add-button');
let formName = document.querySelector('.form__item_section_name');
let formDescription = document.querySelector('.form__item_section_description');
let formPlace = document.querySelector('.form__item_section_place');
let formLink = document.querySelector('.form__item_section_link');
let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');
let cardPopup= document.querySelector('.popup_assignment_card');
let editPopup= document.querySelector('.popup_assignment_edit');
let addPopup= document.querySelector('.popup_assignment_add');
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
        cardPopup.classList.add('popup_opened');
        cardPopup.querySelector('.popup__image').setAttribute('src',link);
        cardPopup.querySelector('.popup__caption').textContent=name;
    });
}
function openEditPopup() {
  formName.value = profileTitle.textContent;
  formDescription.value = profileDescription.textContent;
  editPopup.classList.add('popup_opened');
}
function openAddPopup() {
  addPopup.classList.add('popup_opened');
}



function closePopup() {
  document.querySelector('.popup_opened').classList.remove('popup_opened');
}
function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = formName.value;
    profileDescription.textContent = formDescription.value;
    closePopup();
}
function addFormSubmitHandler(evt) {
    evt.preventDefault();
    addElement(formPlace.value,formLink.value);
    closePopup();
    evt.target.reset();
}


renderElements();
editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);
editPopupOpenButton.addEventListener('click', openEditPopup);
addPopupOpenButton.addEventListener('click', openAddPopup);
popupCloseButton.forEach(function (item){
  item.addEventListener('click', closePopup);
});


    
