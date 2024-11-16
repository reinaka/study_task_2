const showButton = document.querySelector('.rates--all');
const hideButton = document.querySelector('.rates--hide');
const currenciesArr = ["USD", "EUR", "CAD", "CNY", "CHF", "SGD"];

// Функция для получения даты
function getDate() {
  const container = document.querySelector(".datetime");
  const currentDate = new Date;
  const options = {
    timeZone: "Europe/Moscow",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }
  container.textContent = `${new Intl.DateTimeFormat("ru-RU", options).format(currentDate)}`;
}

// Функция для получения валют
async function getRates(base) {
  const key = '85d36fc936ae676cc9836892c7dca04f';
  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/15b6e42073302af7faae7111/latest/${base}`);
    return response.data.conversion_rates;
  } catch (error) {
    throw new Error("Unable to get currency rates");
  }
};

// Функция для выбора нужных валют
function getChosenCurrencies(currenciesList, currenciesArr) {
  let currenciesDict = {};
  for (let key in currenciesList) {
    for (let i = 0; i < currenciesArr.length; i++) {
        if (key === currenciesArr[i]) {
          currenciesDict[key] = currenciesList[key];
        }
    }
  }
  return currenciesDict;
}

// Функция для вставки значений в разметку
function renderCurrencies(currenciesDict, container) {
  if(container.childNodes.length) {
    container.innerHTML = "";
  }
  for (let key in currenciesDict) {
    if(currenciesDict[key]) {
      const wrapper = document.createElement("div");
      wrapper.classList.add(`currency__wrapper`);
      wrapper.innerHTML = `<span class='currency__title'>${key}:</span><span class='currency__rate'>${(1/currenciesDict[key]).toFixed(2)}</span>`;
      container.append(wrapper);
    }
  }
};

// Функция для отображения всех курсов
function showAllCurrencies(currenciesDict) {
  const converter = document.querySelector('.converter__wrapper');
  const container = document.createElement("div");
  container.classList.add(`currencies__container--all`);
  renderCurrencies(currenciesDict, container);
  converter.append(container);
}

// Функция для скрытия всех курсов
function hideAllCurrencies() {
  document.querySelector('.currencies__container--all').remove();
}


// ВЫЗОВ ФУНКЦИЙ
const currenciesList = await getRates('RUB');
renderCurrencies(getChosenCurrencies(currenciesList, currenciesArr), document.querySelector('.currencies__container'));

getDate();

showButton.onclick = async() => {
  showAllCurrencies(currenciesList);
  showButton.classList.add("none");
  hideButton.classList.remove("none");
}

hideButton.onclick = () => {
  hideAllCurrencies();
  showButton.classList.remove("none");
  hideButton.classList.add("none");
}

while(true) {
  await new Promise(res => setTimeout(res, (1000 * 60 * 15)));
  const currenciesList = await getRates('RUB');
  renderCurrencies(getChosenCurrencies(currenciesList, currenciesArr), document.querySelector('.currencies__container'));
}
