function sortList() {
    const input = document.getElementById('search');
    const filter = input.value.toUpperCase();
    const ul = document.getElementById("list");
    const li = ul.getElementsByTagName('li');

    for (let i = 0; i < li.length; i++) {
        let current = li[i];
        let txtValue = current.textContent || current.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

const search = document.getElementById("search");
search.onkeyup = sortList;