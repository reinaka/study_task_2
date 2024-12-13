const key = "live_VM8M2pKntzkdC5jaHej95TMq5kPpo1nHRjtrZlZC0lGopHyFwyBYSXplGiHr1wyc";
// Функция для получения фотографий
async function getImages(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error("Unable to get images");
    }
};

function renderSlides(imageList, container) {
    for(let i = 0; i < imageList.length; i++) {
        const slide = document.createElement("li");
        slide.classList.add(`slide`);
        slide.innerHTML = `<div class="image__wrapper"><img class="image image--${i}" src=${imageList[i].url} alt="image ${i + 1}"/></div><h2 class="slide__heading">Slide ${i + 1}</h2><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p></div>`;
        container.append(slide);
    }
}

// Логика слайдера
const track = document.querySelector('.slider__track');
const slide = document.querySelector('.slide');
const buttonPrev = document.querySelector('.button--prev');
const buttonNext = document.querySelector('.button--next');
const scrollAmount = track.clientWidth * 0.8;

// Функция для отслеживания скролла
function checkScroll() {
    const { scrollLeft, scrollWidth, clientWidth } = track;
    // Show/hide left button
    if (scrollLeft <= 0) {
        buttonPrev.setAttribute("disabled", true);
    } else {
        buttonPrev.removeAttribute("disabled");
    }

    // Show/hide right button
    if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth) {
        buttonNext.setAttribute("disabled", true);
    } else {
        buttonNext.removeAttribute("disabled");
    }
}

// Хендлер для клика по левой кнопке
function scrollLeft() {
    track.scrollLeft -= scrollAmount;
}

//Хендлер для клика по правой кнопке
function scrollRight() {
    track.scrollLeft += scrollAmount;
}


// Загружаем изображения
const imageList = await getImages(`https://api.thecatapi.com/v1/images/search?limit=9&api_key=${key}`);
renderSlides(imageList, document.querySelector(".slider__track"));

// Вешаем обработчики
track.addEventListener('scroll', checkScroll, true);
buttonPrev.addEventListener('click', scrollLeft, true);
buttonNext.addEventListener('click', scrollRight, true);

// Очищаем обработчики
track.removeEventListener('scroll', checkScroll());
buttonPrev.removeEventListener('click', scrollLeft());
buttonNext.removeEventListener('click', scrollRight);