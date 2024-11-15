// Функция для получения валют
async function getRate(base, currenciesArr) {
    const key = '85d36fc936ae676cc9836892c7dca04f';
    try {
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/15b6e42073302af7faae7111/latest/${base}`);
      let currenciesDict = {};
      const resultList = response.data.conversion_rates;
      for (let key in resultList) {
        for (let i = 0; i < currenciesArr.length; i++) {
            if (key === currenciesArr[i]) {
                currenciesDict[key] = (1 / resultList[key].toFixed(2));
            }
        }
      }
      return currenciesDict;
    } catch (error) {
      console.error(error);
    }
  };

// Функция для вставки значений в разметку
function renderCurrencies(currenciesDict) {
    let i = 1;
    for (let key in currenciesDict) {
        if(currenciesDict[key]) {
            const elem = document.querySelector(`.currency__wrapper--${i}`);
            i++;
            elem.querySelector('.currency__title').textContent = `${key}:`;
            elem.querySelector('.currency__rate').textContent = `${currenciesDict[key]}`;
        }
    }
};

renderCurrencies({
    'USD': '12',
    "EUR": '23',
    'RTD': '12',
    "HYT": '23',
    'OPU': '12',
    "BNY": '23',
});

// let click = document.getElementById('click');
// click.onclick = getRate('RUB', ['USD', 'EUR']);