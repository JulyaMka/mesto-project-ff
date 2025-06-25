//функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
}

//функция закрытия попапа
function closePopup(popup) {
  const form = popup.querySelector('.popup__form')
  if (form){
    form.reset();
  }
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
}

//закрытие по оверлею и кнопке
function closePopupButtonAndOverlay(evt, popup) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    closePopup(popup);
  }
}

//закрытие по escape
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup.popup_is-opened");
    closePopup(openedPopup);
  }
}

export { openPopup, closePopup, closePopupEsc, closePopupButtonAndOverlay };
