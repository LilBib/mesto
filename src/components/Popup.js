export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupCloseButton = this._popup.querySelector('.popup__close-icon');
        this._handleOverlayCloseBinded = this._handleOverlayClose.bind(this);
        this._handleEscCloseBinded = this._handleEscClose.bind(this);
        
    }
    open(){
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
    }
    close() {
        this._popup.classList.remove('popup_opened');
        this.removeEventListeners();
    }
    _handleEscClose(evt) {
        if (evt.key == 'Escape') {
            this.close();
          }
    }
    _handleOverlayClose(evt){
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }
    setEventListeners() {
        this._popup.addEventListener('click', this._handleOverlayCloseBinded);
        this._popupCloseButton.addEventListener('click', this.close.bind(this));
        window.addEventListener('keydown', this._handleEscCloseBinded);
    }
    removeEventListeners() {
        this._popup.removeEventListener('click', this._handleOverlayCloseBinded);
        this._popupCloseButton.removeEventListener('click', this.close);
        window.removeEventListener('keydown', this._handleEscCloseBinded);
    }
}