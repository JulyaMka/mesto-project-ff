import "../pages/index.css";
import { createCard, handleLikeClick } from "../components/card.js";
import {
  closePopup,
  openPopup,
  closePopupButtonAndOverlay,
} from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";

import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addCard,
  updateAvatar,
} from "./api.js";
import { configEl } from "../utils/constants.js";

const popupEditProfile = document.querySelector(".popup_type_edit");
const buttonPopupEditProfile = document.querySelector(".profile__edit-button");
const popupAddProfile = document.querySelector(".popup_type_new-card");
const buttonPopupAddProfile = document.querySelector(".profile__add-button");
const popups = document.querySelectorAll(".popup");
const popupTypeImage = document.querySelector(".popup_type_image");
const profileImage = document.querySelector(".profile__image");
const profileContainer = document.querySelector(".profile__avatar-container");
const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const avatarInput = popupTypeAvatar.querySelector(".popup__input_type_url-avatar");


//Вывести карточки на страницу
const placesList = document.querySelector(".places__list");

// Находим поля формы в DOM
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");
const nameInput = popupEditProfile.querySelector(".popup__input_type_name");
const jobInput = popupEditProfile.querySelector(
  ".popup__input_type_description"
);
const formAddCard = popupAddProfile.querySelector(".popup__form"); // Форма добавления карточек

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

let userId = ""; //для хранения id

//вызов открытия с разными попапами
buttonPopupEditProfile.addEventListener("click", () => {
  openPopup(popupEditProfile); //добавление слушателя на esc
  //Для информации со странички в форму редактирования
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  clearValidation(popupEditProfile, configEl);
});

buttonPopupAddProfile.addEventListener("click", () => {
  openPopup(popupAddProfile);
  clearValidation(popupAddProfile, configEl);
});

profileContainer.addEventListener("click", () => {
  openPopup(popupTypeAvatar);
  clearValidation(popupTypeAvatar, configEl);
});

//вызов закрытия по кнопке и оверлею
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) =>
    closePopupButtonAndOverlay(evt, popup)
  );
});

// Функция открытия картинки
function handleImageClick(card) {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
  openPopup(popupTypeImage);
}

enableValidation(configEl);

//Загрузка данных пользователя и карточек
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id; // сохраняем userId
    nameProfile.textContent = userData.name;
    jobProfile.textContent = userData.about;
    profileImage.src = userData.avatar;

    cards.forEach((card) => {
      const cardElement = createCard(card, handleImageClick, userId);
      placesList.prepend(cardElement);
    });
  })
  .catch((err) => {
    console.error("Ошибка при загрузке данных карточек:", err);
  });

// Функция добавления карточки
const nameCardInput = popupAddProfile.querySelector(
  ".popup__input_type_card-name"
);
const urlCardInput = popupAddProfile.querySelector(".popup__input_type_url");

formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(popupAddProfile, true, "Сохранение...");
  addCard(nameCardInput.value, urlCardInput.value)
    .then((data) => {
      const cardElement = createCard(data, handleImageClick, userId);
      placesList.prepend(cardElement);
      closePopup(popupAddProfile);
      formAddCard.reset();
    })
    .catch(() => {
      console.log("Ошибка добавления карточки");
    })
    .finally(() => renderLoading(popupAddProfile, false));
});

//Функция редактирования профиля через сервер
popupEditProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const descriptionValue = jobInput.value;
  renderLoading(popupEditProfile, true, "Сохранение...");
  updateUserInfo(nameValue, descriptionValue)
    .then((data) => {
      nameProfile.textContent = data.name;
      jobProfile.textContent = data.about;
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.error("Ошибка при сохранении профиля:", err);
    })
    .finally(() => renderLoading(popupEditProfile, false));
});

//запрос обновления аватара
popupTypeAvatar.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const avatarValue = avatarInput.value;
  renderLoading(popupTypeAvatar, true, "Сохранение...");
  updateAvatar(avatarValue)
    .then((data) => {
      profileImage.src = data.avatar;
      closePopup(popupTypeAvatar);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
    })
    .finally(() => {
      renderLoading(popupTypeAvatar, false);
    });
});

//Функция для кнопки при отправке данных на сервер
function renderLoading(formElement, isLoading, loadingText) {
  const submitButton = formElement.querySelector(".popup__button");
  if (!submitButton.dataset.oldText) {
    submitButton.dataset.oldText = submitButton.textContent;
  }
  if (submitButton) {
    if (isLoading) {
      submitButton.textContent = loadingText;
    } else {
      submitButton.textContent = submitButton.dataset.oldText;
    }
  }
}
