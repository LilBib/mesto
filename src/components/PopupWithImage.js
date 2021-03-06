import {Popup} from "./Popup.js"
export class PopupWithImage extends Popup {
    constructor(popupSelector,errorImage) {
        super(popupSelector);
        this._errorImage=errorImage;
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupCaption = this._popup.querySelector('.popup__caption');
        this._openOnErrorBinded = this._openOnError.bind(this);
    }

    open(link, name) {
        super.open();
        this._popupImage.src=link;
        this._popupImage.setAttribute('alt',`${name}`);
        this._popupCaption.textContent=name;
    }
    _openOnError() {
        super.open();
        this._popupImage.src=this._errorImage;
        this._popupImage.setAttribute('alt',`img loading error`);
    }
        setEventListeners() {
        super.setEventListeners();
        this._popupImage.addEventListener('error',this._openOnErrorBinded);
    }
    removeEventListeners() {
        super.removeEventListeners();
        this._popupImage.removeEventListener('error',this._openOnErrorBinded);
    }
}