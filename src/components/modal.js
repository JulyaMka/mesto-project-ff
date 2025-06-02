export { openPopup, closePopup, closePopupButtonAndOverlay };
import {closePopupEsc,} from "./card.js";

//функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

//закрытие по оверлею и кнопке
function closePopupButtonAndOverlay(evt, popup) {
    if (
      evt.target.classList.contains("popup__close") ||
      evt.target.classList.contains("popup")
    ) {
      closePopup(popup);
      document.removeEventListener("keydown", closePopupEsc); //удаление слушателя на esc
    }
  }
