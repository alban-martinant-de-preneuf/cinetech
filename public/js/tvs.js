import { getData } from "./modules/module.js";

function displayContent() {
    const moviesDiv = (document.createElement('div'));
    moviesDiv.classList.add('movies_div');

    getData("https://api.themoviedb.org/3/discover/tv?language=fr-FR&page=1&sort_by=popularity.desc").then(result => {
        const items = result.results;
        console.log('series')
        moviesDiv.innerHTML = '<h2>Series</h2>';
        for (let film of items) {
            moviesDiv.innerHTML += (`
                <a href="/cinetech/tvs/${film.id}">
                    <div class="item_div">
                        <div class="image_container">
                            <img src="https://image.tmdb.org/t/p/w342/${film.poster_path}">
                        </div>
                    </div>
                </a>
            `)
        }
    })
    mainContainer.appendChild(moviesDiv)
}

const mainContainer = document.getElementById('main_container');

displayContent();