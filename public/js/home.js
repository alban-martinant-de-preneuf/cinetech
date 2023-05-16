const mainContainer = document.getElementById('main_container');

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTI3ZmY0Yzg0Njk4MTM2YTAzYzJjYjVkMmUzNDliMyIsInN1YiI6IjY0NjFlZDhhZWY4YjMyMDExYjE0N2NlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pLIoyG8msCcMdFu39dLleYXaU7cMkM4hUX-ndF_Cli4'
    }
};

async function getData(url) {
    const response = await fetch(url, options)
    const populars = await response.json();
    return populars.results
}

getData('https://api.themoviedb.org/3/trending/movie/day?language=fr-FR&page=1').then(items => {
    trendingMoviesDiv = (document.createElement('div'));
    trendingMoviesDiv.classList.add('popular_div');
    for (let i = 0; i < 4; i++) {
        console.log(items[i])
        trendingMoviesDiv.innerHTML += (`
            <div class="polular_div">
                <div class="item_div">
                    <div class="image_container">
                        <img src="https://image.tmdb.org/t/p/w342/${items[i].poster_path}">
                    </div>
                    <h3>${items[i].title}</h3>
                </div>
            </div>`)
    }
    mainContainer.appendChild(trendingMoviesDiv)
})

getData('https://api.themoviedb.org/3/trending/tv/day?language=fr-FR&page=1').then(items => {
    trendingTvDiv = (document.createElement('div'));
    trendingTvDiv.classList.add('popular_div');
    for (let i = 0; i < 4; i++) {
        console.log(items[i])
        trendingTvDiv.innerHTML += (`
            <div class="polular_div">
                <div class="item_div">
                    <div class="image_container">
                        <img src="https://image.tmdb.org/t/p/w342/${items[i].poster_path}">
                    </div>
                    <h3>${items[i].name}</h3>
                </div>
            </div>`)
    }
    mainContainer.appendChild(trendingTvDiv)
})