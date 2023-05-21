import { getData } from "./modules/module.js";

function displayContent() {
    const trendingMoviesDiv = (document.createElement('div'));
    trendingMoviesDiv.classList.add('popular_div');

    getData('https://api.themoviedb.org/3/trending/movie/day?language=fr-FR&page=1').then(result => {
        const items = result.results;
        trendingMoviesDiv.innerHTML = '<h2>Films tendance</h2>';
        for (let i = 0; i < 4; i++) {
            console.log(items[i])
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
    })
    mainContainer.appendChild(trendingMoviesDiv)

    const trendingTvDiv = (document.createElement('div'));
    trendingTvDiv.classList.add('popular_div');

    getData('https://api.themoviedb.org/3/trending/tv/day?language=fr-FR&page=1').then(result => {
        const items = result.results;
        trendingTvDiv.innerHTML = '<h2>Series tendance</h2>';
        for (let i = 0; i < 4; i++) {
            console.log(items[i])
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
    })
    mainContainer.appendChild(trendingTvDiv)
}

const mainContainer = document.getElementById('main_container');

displayContent();
