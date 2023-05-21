import { getData } from "./modules/module.js";

async function displayContent() {
    const movieDiv = (document.createElement('div'));
    movieDiv.classList.add('movie_div');

    const currentURI = window.location.pathname;
    const parts = currentURI.split('/');
    const idTv = parts.pop();

    const tv = await getData("https://api.themoviedb.org/3/tv/" + idTv + "?language=fr-FR");
    const credits = await getData("https://api.themoviedb.org/3/tv/" + idTv + "/credits?language=fr-FR");

    const genres = tv.genres.map(genre => genre.name).join(', ');

    movieDiv.innerHTML = (
        `<div class="details_div">
            <div class="image_container">
                <img src="https://image.tmdb.org/t/p/w342/${tv.poster_path}">
            </div>
            <div class="movie_details">
                <p>Genre(s) : ${genres}</p>
                <p>Avec : ${credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}</p>
                <h2>${tv.name}</h2>
                <h5>${tv.tagline}</h5>
                <p>${tv.overview}</p>
                <p>note : ${tv.vote_average.toFixed(1)}/10</p>
            </div>
        </div>`
    );


    mainContainer.appendChild(movieDiv)

}

const mainContainer = document.getElementById('main_container');

displayContent();