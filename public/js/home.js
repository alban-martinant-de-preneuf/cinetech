import { getData, loader } from "./modules/module.js";

async function contentMovies() {
    const trendingMoviesDiv = (document.createElement('div'));
    trendingMoviesDiv.classList.add('popular_div');

    const result = await getData('https://api.themoviedb.org/3/trending/movie/day?language=fr-FR&page=1')
    const items = result.results;
    trendingMoviesDiv.innerHTML = '<h2>Films tendance</h2>';
    for (let i = 0; i < 4; i++) {
        trendingMoviesDiv.innerHTML += (`
                <div class="item_div">
                    <a href="/cinetech/movies/${items[i].id}">
                        <div class="image_container">
                            <img src="https://image.tmdb.org/t/p/w342/${items[i].poster_path}">
                        </div>
                    </a>
                </div>
            `)
    }
    return trendingMoviesDiv
}

async function contentTvs() {
    const trendingTvDiv = (document.createElement('div'));
    trendingTvDiv.classList.add('popular_div');

    const result = await getData('https://api.themoviedb.org/3/trending/tv/day?language=fr-FR&page=1')
    const items = result.results;
    trendingTvDiv.innerHTML = '<h2>Series tendance</h2>';
    for (let i = 0; i < 4; i++) {
        trendingTvDiv.innerHTML += (`
                <div class="item_div">
                    <a href="/cinetech/tvs/${items[i].id}">
                        <div class="image_container">
                            <img src="https://image.tmdb.org/t/p/w342/${items[i].poster_path}">
                        </div>
                    </a>
                </div>
            `)
    }
    return trendingTvDiv;
}

async function dislplayContent() {
    loader();
    const moviesDiv = await contentMovies();
    const tvsDiv = await contentTvs();
    const mainContainer = document.getElementById('main_container');
    mainContainer.appendChild(moviesDiv);
    mainContainer.appendChild(tvsDiv);
}

dislplayContent().then(() => document.getElementById('loader')?.remove())
