const form = document.querySelector('.form');
const inputList = Array.from(form.querySelectorAll('.input'));
const buttonElement = form.querySelector('.button');

startValidation();

function startValidation() {
  toggleButton();
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (hasInvalidInput()) {
      inputList.forEach((inputElement) => {
        checkInputValidity(inputElement);
        toggleInputError(inputElement);
      })
    }
  });
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement);
      toggleButton();
    })
    inputElement.addEventListener('blur', () => {
      toggleInputError(inputElement);
    })
    inputElement.addEventListener('focus', () => {
      toggleErrorSpan(inputElement);
    })
  });
};

function checkInputValidity(inputElement) {
    console.log(inputElement);
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity(checkLengthMismatch(inputElement));
  }
};

function checkLengthMismatch(inputElement) {
  if (inputElement.type !== 'text') return '';

  const valueLength = inputElement.value.trim().length;
  if (valueLength < inputElement.minLength) return `Заполните это поле`;

  return '';
};

function hasInvalidInput() {
  return inputList.some(inputElement => !inputElement.validity.valid);
};

function toggleErrorSpan(inputElement, errorMessage){
  const errorElement = document.querySelector(`.${inputElement.id}-error`);
  if (errorMessage) {
    inputElement.classList.add('input--error');
    errorElement.textContent = errorMessage;
  } else {
    inputElement.classList.remove('input--error');
    errorElement.textContent = '';
  }
};

function toggleButton() {
  if (hasInvalidInput()) {
    buttonElement.classList.add('button-inactive');
    buttonElement.setAttribute('aria-disabled', 'true');
  } else {
    buttonElement.classList.remove('button-inactive');
    buttonElement.setAttribute('aria-disabled', 'false');
  }
};

function toggleInputError(inputElement) {
    if (!inputElement.validity.valid) {
      toggleErrorSpan(inputElement, inputElement.validationMessage)
    } else {
      toggleErrorSpan(inputElement)
    }
  }
