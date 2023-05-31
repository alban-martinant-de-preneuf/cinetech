import { getData, loader } from "./modules/module.js";

const mainContainer = document.getElementById('main_container');

async function getContent() {
    const favoriteDiv = (document.createElement('div'));
    favoriteDiv.classList.add('favorite_div');

    const favorites = await getData('/cinetech/favoriteslist');

    favoriteDiv.innerHTML = '<h2>Films favoris</h2>';

    const moviesDiv = document.createElement('div');
    moviesDiv.classList.add('fav_movies_div', 'flex_wrap');

    for (let idMovie of favorites.movies) {
        console.log(idMovie);
        const movie = await getData(`https://api.themoviedb.org/3/movie/${idMovie}?language=fr-FR`);
        console.log(movie);
        moviesDiv.innerHTML += (`
            <div class="item_div">
                <a href="/cinetech/movies/${movie.id}">
                    <div class="image_container">
                        <img src="https://image.tmdb.org/t/p/w185/${movie.poster_path}">
                    </div>
                </a>
            </div>
        `)
    }
    favoriteDiv.appendChild(moviesDiv);

    favoriteDiv.innerHTML += '<h2>Séries favorites</h2>';

    const tvsDiv = document.createElement('div');
    tvsDiv.classList.add('tvs_div', 'flex_wrap');

    for (let idTv of favorites.tvs) {
        const tv = await getData(`https://api.themoviedb.org/3/tv/${idTv}?language=fr-FR`);
        tvsDiv.innerHTML += (`
            <div class="item_div">
                <a href="/cinetech/tvs/${tv.id}">
                    <div class="image_container">
                        <img src="https://image.tmdb.org/t/p/w185/${tv.poster_path}">
                    </div>
                </a>
            </div>
        `)
    }
    favoriteDiv.appendChild(tvsDiv);

    return favoriteDiv;
}

loader();
getContent().then(content => {
    mainContainer.appendChild(content);
    document.getElementById('loader')?.remove();
});

