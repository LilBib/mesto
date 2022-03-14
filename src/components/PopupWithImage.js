import {Popup} from "./Popup.js"
export class PopupWithImage extends Popup {
    constructor(popupSelector,errorImage) {
        super(popupSelector);
        this._errorImage=errorImage;
        this._popupImage = document.querySelector('.popup__image');
        this._popupCaption = document.querySelector('.popup__caption');
    }
    open(link, name) {
        super.open();
        this._popupImage.src=link;
        this._popupImage.setAttribute('alt',`${name}`);
        this._popupCaption.textContent=name;
    }
    openOnError() {
        super.open();
        this._popupImage.src=this._errorImage;
        this._popupImage.setAttribute('alt',`img loading error`);
    }
}