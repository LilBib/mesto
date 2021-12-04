let formElement = document.querySelector('.form');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-icon');
let popup = document.querySelector('.popup');
let formName = document.querySelector('.form__item_section_name');
let formDescription = document.querySelector('.form__item_section_description');
let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');


function openPopup() {
    formName.value = profileTitle.textContent;
    formDescription.value = profileDescription.textContent;
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = formName.value;
    profileDescription.textContent = formDescription.value
    closePopup();
}


formElement.addEventListener('submit', formSubmitHandler);
popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
