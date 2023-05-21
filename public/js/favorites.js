import { getData } from "./modules/module.js";

const mainContainer = document.getElementById('main_container');

async function displayContent() {
    const favoriteDiv = (document.createElement('div'));
    favoriteDiv.classList.add('favorite_div');

    const favorites = await getData('/cinetech/favoritesList');
    console.log(favorites);
    favoriteDiv.innerHTML = '<h2>Films favoris</h2>';
    for (let idMovie of favorites.movies) {
        console.log(idMovie);
        const movie = await getData(`https://api.themoviedb.org/3/movie/${idMovie}?language=fr-FR`);
        console.log(movie);
        favoriteDiv.innerHTML += (`
            <div class="item_div">
                <a href="/cinetech/movies/${movie.id}">
                    <div class="image_container">
                        <img src="https://image.tmdb.org/t/p/w342/${movie.poster_path}">
                    </div>
                </a>
            </div>
        `)
    }
    favoriteDiv.innerHTML += '<h2>Séries favorites</h2>';
    for (let idTv of favorites.tvs) {
        console.log(idTv);
        const tv = await getData(`https://api.themoviedb.org/3/tv/${idTv}?language=fr-FR`);
        console.log(tv);
        favoriteDiv.innerHTML += (`
            <div class="item_div">
                <a href="/cinetech/tvs/${tv.id}">
                    <div class="image_container">
                        <img src="https://image.tmdb.org/t/p/w342/${tv.poster_path}">
                    </div>
                </a>
            </div>
        `)
    }
    mainContainer.appendChild(favoriteDiv);
}

displayContent();

