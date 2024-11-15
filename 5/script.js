const offset = 100;
const button = document.querySelector(".button");

function getTop() {
    return window.scrollY || document.documentElement.scrollTop;
}

window.addEventListener('scroll', () => {
    getTop() > offset ? button.classList.add("button--visible") : button.classList.remove("button--visible");
});

button.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
});
