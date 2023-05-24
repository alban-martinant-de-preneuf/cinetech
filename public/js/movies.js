import { getData, loader } from "./modules/module.js";

async function pageContent() {
    const moviesDiv = (document.createElement('div'));
    moviesDiv.classList.add('movies_div', 'flex_wrap');

    const result = await getData("https://api.themoviedb.org/3/discover/movie?language=fr-FR&page=1&sort_by=popularity.desc")
    const items = result.results;
    for (let film of items) {
        moviesDiv.innerHTML += (`
            <div class="item_div">
                <a href="/cinetech/movies/${film.id}">
                    <div class="image_container">
                        <img src="https://image.tmdb.org/t/p/w185/${film.poster_path}">
                    </div>
                </a>
            </div>
        `)
    }

    return moviesDiv;
}

loader();
const mainContainer = document.getElementById('main_container');
pageContent().then((content) => {
    mainContainer.appendChild(content);
    document.getElementById('loader')?.remove();
})