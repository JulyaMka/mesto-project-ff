function createCard(cardData, handleImageClick) {
  //Темплейт карточки
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  imageElement.src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  imageElement.setAttribute("alt", cardData.name);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

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

export { createCard, deleteCard, handleLikeClick };
