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
const cardPopup= document.querySelector('.popup_assignment_card');
const editPopup= document.querySelector('.popup_assignment_edit');
const addPopup= document.querySelector('.popup_assignment_add');
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

function renderElements () {
    initialCards.forEach(function(item) {
        addElement(item.name, item.link);
    }); 
}

function createCard (name, link) {
  const cardTemplate = document.querySelector('#element').content;
  const cardElement= cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__card').src=link;
  cardElement.querySelector('.element__description').textContent=name;
  cardElement.querySelector('.element__card').setAttribute("alt",`${name}`);

  cardElement.querySelector('.element__like-button').addEventListener('click', function(evt){
      evt.target.classList.toggle('element__like-button_active');
  });
  cardElement.querySelector('.element__delete-button').addEventListener('click', function(evt){
      evt.target.closest('.element').remove();
  });
  cardElement.querySelector('.element__card').addEventListener('click', function(evt){
      openPopup(cardPopup);
      cardPopup.querySelector('.popup__image').setAttribute('src',link);
      cardPopup.querySelector('.popup__caption').textContent=name;
      cardPopup.querySelector('.popup__image').setAttribute("alt",`${name}`);
  });
  return cardElement;
}

function addElement (name, link) {
  const cardElement=createCard(name, link);
  elements.prepend(cardElement);   
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openEditPopup() {
  formName.value = profileTitle.textContent;
  formDescription.value = profileDescription.textContent;
  openPopup(editPopup);
}

function closePopup() {
  const openedPopup = document.querySelector('.popup_opened')
  if (openedPopup) {
    openedPopup.classList.remove('popup_opened');
  }

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
addPopupOpenButton.addEventListener('click', () => {
    openPopup(addPopup);
  });
popupCloseButtons.forEach(function (item){
  item.addEventListener('click', closePopup);
});

// Геннадий, спасибо за очень быстрое и качественное ревью!!=)
    
