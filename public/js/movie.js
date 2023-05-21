import { getData } from "./modules/module.js";

async function displayContent() {
    const movieDiv = (document.createElement('div'));
    movieDiv.classList.add('movie_div');

    const currentURI = window.location.pathname;
    const parts = currentURI.split('/');
    const idMovie = parts.pop();
    
    const movie = await getData("https://api.themoviedb.org/3/movie/" + idMovie + "?language=fr-FR");
    const credits = await getData("https://api.themoviedb.org/3/movie/" + idMovie + "/credits?language=fr-FR");

    const genres = movie.genres.map(genre => genre.name).join(', ');

    movieDiv.innerHTML = (
        `<div class="details_div">
                <div class="image_container">
                    <img src="https://image.tmdb.org/t/p/w342/${movie.poster_path}">
                </div>
                <div class="movie_details">
                    <p>Genre(s) : ${genres}</p>
                    <p>Avec : ${credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}</p>
                    <h2>${movie.title}</h2>
                    <h5>${movie.tagline}</h5>
                    <p>${movie.overview}</p>
                    <p>note : ${movie.vote_average.toFixed(1)}/10</p>
                </div>
            </div>`
    );

    const reco = await getData("https://api.themoviedb.org/3/movie/" + idMovie + "/recommendations?language=fr-FR");

    const recoDiv = (document.createElement('div'));
    recoDiv.classList.add('reco_div');
    console.log(reco)

    recoDiv.innerHTML = `<h2>Recommandations</h2>`;
    reco.results.forEach(movie => {
        if (movie.poster_path !== null) {
        recoDiv.innerHTML += (
            `<div class="reco_movie">
                <a href="/cinetech/movies/${movie.id}">
                    <img src="https://image.tmdb.org/t/p/w154/${movie.poster_path}">
                </a>
            </div>`
        )
        }
    })

    mainContainer.appendChild(movieDiv)
    mainContainer.appendChild(recoDiv)

}

const mainContainer = document.getElementById('main_container');

displayContent();