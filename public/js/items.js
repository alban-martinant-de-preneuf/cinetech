import { getData, loader } from "./modules/module.js";

console.log(window.location.pathname);

function getType() {
    const currentURI = window.location.pathname;
    const parts = currentURI.split('/');
    const typeItem = parts.pop();
    return typeItem
}

async function pageContent(page) {
    const moviesDiv = (document.createElement('div'));
    moviesDiv.classList.add('movies_div', 'flex_wrap');
    const type = getType();
    const typeSingular = type.substring(0,type.length-1);
    const result = await getData("https://api.themoviedb.org/3/discover/" + typeSingular + "?language=fr-FR&page=" + page +"&sort_by=popularity.desc")
    const items = result.results;
    for (let film of items) {
        moviesDiv.innerHTML += (`
            <div class="item_div">
                <a href="/cinetech/${type}/${film.id}">
                    <div class="image_container">
                        <img src="https://image.tmdb.org/t/p/w185/${film.poster_path}">
                    </div>
                </a>
            </div>
        `)
    }
    return moviesDiv;
}

function displayContent(page) {
    loader();
    pageContent(page).then((content) => {
        const mainContainer = document.getElementById('main_container');
        mainContainer.innerHTML = '';
        mainContainer.appendChild(content);
        document.getElementById('loader')?.remove();
    })
}

function pagination(page) {
    const previous = document.querySelectorAll('.previous');
    const next = document.querySelectorAll('.next');
    previous.forEach(button => {
        button.addEventListener('click', () => {
            if (page > 1) {
                page--;
                displayContent(page);
            }
        })
    });
    next.forEach(button => {
        button.addEventListener('click', () => {
            page++;
            displayContent(page);
        })
    });
}

displayContent(1);
pagination(1);
