// @todo: Функция создания карточки
function createCard(cardData) {
  // @todo: Темплейт карточки
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  // @todo: DOM узлы
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.setAttribute('alt', cardData.name);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", ()=> deleteCard(cardElement));

  return cardElement;
  
} 

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}  

// @todo: Вывести карточки на страницу
const placesList = document.querySelector('.places__list');
initialCards.forEach((item) =>{
  const cardElement = createCard(item);
  placesList.append(cardElement);
});