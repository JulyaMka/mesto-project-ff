import { handleImageClick } from "../scripts/index.js";
export { createCard, deleteCard, handleLikeClick, closePopupEsc };
import { closePopup } from "../components/modal.js";

function createCard(cardData) {
  //Темплейт карточки
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.setAttribute("alt", cardData.name);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  const imageElement = cardElement.querySelector(".card__image");
  imageElement.addEventListener("click", () => handleImageClick(cardData));

  return cardElement;
}

//Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

//функция лайка на карточке
function handleLikeClick(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

//закрытие по escape
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup.popup_is-opened");
    closePopup(openedPopup);
  }
}
