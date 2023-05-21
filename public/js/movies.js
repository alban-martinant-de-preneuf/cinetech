import { getData } from "./modules/module.js";

function displayContent() {
    const moviesDiv = (document.createElement('div'));
    moviesDiv.classList.add('movies_div');

    getData("https://api.themoviedb.org/3/discover/movie?language=fr-FR&page=1&sort_by=popularity.desc").then(result => {
        const items = result.results;
        for (let film of items) {
            moviesDiv.innerHTML += (`
            <div class="item_div">
                <a href="/cinetech/movies/${film.id}">
                    <div class="image_container">
                        <img src="https://image.tmdb.org/t/p/w342/${film.poster_path}">
                    </div>
                </a>
            </div>
            `)
        }
    })
    mainContainer.appendChild(moviesDiv)
}

const mainContainer = document.getElementById('main_container');

displayContent();