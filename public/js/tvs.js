import { getData } from "./modules/module.js";

function displayContent() {
    const moviesDiv = (document.createElement('div'));
    moviesDiv.classList.add('movies_div');

    getData("https://api.themoviedb.org/3/discover/tv?language=fr-FR&page=1&sort_by=popularity.desc").then(result => {
        const items = result.results;
        for (let tv of items) {
            moviesDiv.innerHTML += (`
                <a href="/cinetech/tvs/${tv.id}">
                    <div class="item_div">
                        <div class="image_container">
                            <img src="https://image.tmdb.org/t/p/w342/${tv.poster_path}">
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