import "../pages/index.css";
import { initialCards } from "./cards.js";
import {
  createCard,
  handleLikeClick,
  closePopupEsc,
} from "../components/card.js";
import {
  closePopup,
  openPopup,
  closePopupButtonAndOverlay,
} from "../components/modal.js";

const popupEditProfile = document.querySelector(".popup_type_edit");
const buttonPopupEditProfile = document.querySelector(".profile__edit-button");
const popupAddProfile = document.querySelector(".popup_type_new-card");
const buttonPopupAddProfile = document.querySelector(".profile__add-button");
const popups = document.querySelectorAll(".popup");
const popupTypeImage = document.querySelector(".popup_type_image");

//Вывести карточки на страницу
const placesList = document.querySelector(".places__list");
initialCards.forEach((item) => {
  const cardElement = createCard(item);
  placesList.append(cardElement);
});

//вызов открытия с разными попапами
buttonPopupEditProfile.addEventListener("click", () => {
  openPopup(popupEditProfile);
  document.addEventListener("keydown", closePopupEsc); //добавление слушателя на esc
  //Для информации со странички в форму редактирования
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});
buttonPopupAddProfile.addEventListener("click", () => {
  openPopup(popupAddProfile);
  document.addEventListener("keydown", closePopupEsc); //добавление слушателя на esc
});

//вызов закрытия по кнопке и оверлею
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) =>
    closePopupButtonAndOverlay(evt, popup)
  );
});

// Находим поля формы в DOM
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");
const nameInput = popupEditProfile.querySelector(".popup__input_type_name");
const jobInput = popupEditProfile.querySelector(
  ".popup__input_type_description"
);
function handleEditFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  const nameValue = nameInput.value;
  const descriptionValue = jobInput.value;
  nameProfile.textContent = nameValue;
  jobProfile.textContent = descriptionValue;
  popupEditProfile.classList.remove("popup_is-opened"); //закрытие попапа при нажатии сохранить
}
popupEditProfile.addEventListener("submit", handleEditFormSubmit);

//функция создания новой карточки
const nameCardInput = popupAddProfile.querySelector(
  ".popup__input_type_card-name"
);
const urlCardInput = popupAddProfile.querySelector(".popup__input_type_url");
function addCard(evt) {
  evt.preventDefault();
  const nameValue = nameCardInput.value;
  const urlValue = urlCardInput.value;
  const objectCard = {
    name: nameValue,
    link: urlValue,
  };
  const cardElement = createCard(objectCard);
  placesList.prepend(cardElement);
  nameCardInput.value = "";
  urlCardInput.value = "";

  popupAddProfile.classList.remove("popup_is-opened");
}

const formAddCard = popupAddProfile.querySelector(".popup__form"); // Форма добавления карточек
formAddCard.addEventListener("submit", addCard); // Правильный обработчи
placesList.addEventListener("click", handleLikeClick);

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
export function handleImageClick(card) {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;

  openPopup(popupTypeImage);
  document.addEventListener("keydown", closePopupEsc); //добавление слушателя на esc
}
