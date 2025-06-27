//функция показа ошибки под инпутом
const showError = (popupElement, inputElement, errorMessage, settings) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.classList.add(settings.errorClassActive);
  errorElement.textContent = errorMessage;
};

//функция скрытия ошибки под инпутом
const hideError = (popupElement, inputElement, settings) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClassActive);
  errorElement.textContent = "";
};

//функция проверки при каждом клике клавиши на ошибку ввода
const isValid = (popupElement, inputElement, settings) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showError(
      popupElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideError(popupElement, inputElement, settings);
  }
};

//функция перебора всех инпутов в форме
const setEventListeners = (popupElement, settings) => {
  const inputList = Array.from(
    popupElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = popupElement.querySelector(
    settings.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(popupElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

//функция перебора всех форм 
const enableValidation = (settings) => {
  const formList = Array.from(
    document.querySelectorAll(settings.formSelector)
  );

  formList.forEach((popupElement) => {
    setEventListeners(popupElement, settings);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  //для попапа открытия картинки проверка(что нет кнопки)
  if (buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(settings.inactiveButtonClass);
    }
  }
};

//функция очистки ошибок после закрытия формы
const clearValidation = (popupElement, settings) => {
  const inputList = Array.from(
    popupElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = popupElement.querySelector(
    settings.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    hideError(popupElement, inputElement, settings);
  });
  toggleButtonState(inputList, buttonElement, settings);
};

export { enableValidation, clearValidation };
