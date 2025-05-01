// @todo: Функция создания карточки
function addCard(cardList) {
  // @todo: Темплейт карточки
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  // @todo: DOM узлы
  cardElement.querySelector('.card__image').src = cardList.link;
  cardElement.querySelector('.card__title').textContent = cardList.name;
  cardElement.setAttribute('alt', cardList.name);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
  // @todo: Функция удаления карточки
  function deleteCard() {
    const cards = this.parentElement;
    cards.remove();
  }  
} 

// @todo: Вывести карточки на страницу
const placesList = document.querySelector('.places__list');
initialCards.forEach((item) =>{
  const cardElement = addCard(item);
  placesList.append(cardElement);
});