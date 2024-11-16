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
        const slide = document.createElement("div");
        slide.classList.add(`slide`);
        slide.innerHTML = `<img class="image image--${i}" src=${imageList[i].download_url} alt="image ${i + 1}"/><h2 class="slide__heading">Slide ${i + 1}</h2><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p></div>`;
        container.append(slide);
    }
}

const imageList = await getImages("https://picsum.photos/v2/list?page=1&limit=9");
console.log(imageList);
renderSlides(imageList, document.querySelector(".slider__track"));


// Логика слайдера
let position = 0;

const wrapper = document.querySelector('.slider__wrapper');
const track = document.querySelector('.slider__track');
const slide = document.querySelector('.slide');

const buttonPrev = document.querySelector('.button--prev');
const buttonNext = document.querySelector('.button--next');

function setPosition() {
    track.style.transform = `translateX(${position}px)`;
}

function checkButton() {
    position === 0 ? buttonPrev.setAttribute("disabled", "true") : buttonPrev.removeAttribute("disabled");
    position <= -2980 ? buttonNext.setAttribute("disabled", "true") : buttonNext.removeAttribute("disabled");
}

buttonPrev.onclick = () => {
    position += 330;
    setPosition();
    checkButton();
}

buttonNext.onclick = () => {
    position -= 330;
    setPosition();
    checkButton();
}

checkButton();