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
    const typeSingular = type.substring(0, type.length - 1);
    const result = await getData("https://api.themoviedb.org/3/discover/" + typeSingular + "?language=fr-FR&page=" + page + "&sort_by=popularity.desc")
    const items = result.results;
    for (let film of items) {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item_div";

        const link = document.createElement("a");
        link.href = `/cinetech/${type}/${film.id}`;

        const imageContainerDiv = document.createElement("div");
        imageContainerDiv.className = "image_container";

        const image = document.createElement("img");
        image.src = `https://image.tmdb.org/t/p/w185/${film.poster_path}`;

        // Construire la structure du DOM
        imageContainerDiv.appendChild(image);
        link.appendChild(imageContainerDiv);
        itemDiv.appendChild(link);

        // Ajouter l'élément itemDiv au parent moviesDiv existant
        moviesDiv.appendChild(itemDiv);

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

function displayPreviousBtn(previousBtns, page) {
    previousBtns.forEach(button => {
        if (page === 1) {
            button.style.visibility = 'hidden';
        } else {
            button.style.visibility = 'visible';
        }
    });
}

function pagination(page) {
    const previous = document.querySelectorAll('.previous');
    const next = document.querySelectorAll('.next');
    displayPreviousBtn(previous, page);
    previous.forEach(button => {
        button.addEventListener('click', () => {
            if (page > 1) {
                page--;
                displayContent(page);
                displayPreviousBtn(previous, page);
            }
        })
    });
    next.forEach(button => {
        button.addEventListener('click', () => {
            page++;
            displayContent(page);
            displayPreviousBtn(previous, page);
        })
    });
}

displayContent(1);
pagination(1);
