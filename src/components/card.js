import { putLike, deleteLike, deleteCardApi } from "../scripts/api";

function createCard(cardData, handleImageClick, userID) {
  // Темплейт карточки
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  // Элементы карточки
  const imageElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCard = cardElement.querySelector(".card__number-likes");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Установка данных карточки
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  titleElement.textContent = cardData.name;
  likeCard.textContent = cardData.likes.length;

  // Проверка, лайкал ли текущий пользователь эту карточку
  if (cardData.likes.some((user) => user._id === userID)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Обработчик лайка на карточке
  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains(
      "card__like-button_is-active"
    );

    const likePromise = isLiked ? deleteLike(cardData._id) : putLike(cardData._id);

    likePromise
      .then((updatedCard) => {
        likeCard.textContent = updatedCard.likes.length;
        if (isLiked) {
          likeButton.classList.remove("card__like-button_is-active");
        } else {
          likeButton.classList.add("card__like-button_is-active");
        }
      })
      .catch((err) => {
        console.error("Ошибка при обновлении лайка:", err);
      });
  });

  // Удаление кнопки, если карточка не принадлежит текущему пользователю
  if (cardData.owner._id !== userID) {
    deleteButton.remove();
  }

  // Обработчик удаления карточки
  deleteButton.addEventListener("click", () => {
    deleteCardApi(cardData._id)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => {
        console.error("Ошибка удаления карточки:", err);
      });
  });

  // Обработчик открытия изображения в попапе
  imageElement.addEventListener("click", () => {
    handleImageClick(cardData);
  });

  return cardElement;
}

//функция лайка на карточке 
function handleLikeClick(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

export { createCard, handleLikeClick };
