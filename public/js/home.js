async function getData(url) {
    const response = await fetch(url, options)
    const populars = await response.json();
    return populars.results
}

function displayContent() {
    trendingMoviesDiv = (document.createElement('div'));
    trendingMoviesDiv.classList.add('popular_div');

    getData('https://api.themoviedb.org/3/trending/movie/day?language=fr-FR&page=1').then(items => {
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

    trendingTvDiv = (document.createElement('div'));
    trendingTvDiv.classList.add('popular_div');

    getData('https://api.themoviedb.org/3/trending/tv/day?language=fr-FR&page=1').then(items => {
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

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTI3ZmY0Yzg0Njk4MTM2YTAzYzJjYjVkMmUzNDliMyIsInN1YiI6IjY0NjFlZDhhZWY4YjMyMDExYjE0N2NlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pLIoyG8msCcMdFu39dLleYXaU7cMkM4hUX-ndF_Cli4'
    }
};

displayContent();
