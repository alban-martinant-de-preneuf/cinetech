async function getData(url) {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
}

async function displayContent() {
    const currentURI = window.location.pathname;
    const parts = currentURI.split('/');
    const idMovie = parts.pop();
    
    const movie = await getData("https://api.themoviedb.org/3/movie/" + idMovie + "?language=fr-FR");
    const credits = await getData("https://api.themoviedb.org/3/movie/" + idMovie + "/credits?language=fr-FR");
    console.log(credits)
    console.log(movie)

    movieDiv = (document.createElement('div'));
    movieDiv.classList.add('movie_div');

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

    recoDiv = (document.createElement('div'));
    recoDiv.classList.add('reco_div');
    console.log(reco)

    recoDiv.innerHTML = `<h2>Recommandations</h2>`;
    reco.results.forEach(movie => {
        if (movie.poster_path == null) {
        recoDiv.innerHTML += (
            `<div class="reco_movie">
                <a href="/movie/${movie.id}">
                    <img src="https://image.tmdb.org/t/p/w342/${movie.poster_path}">
                </a>
            </div>`
        )
        }
    })

    mainContainer.appendChild(movieDiv)
    mainContainer.appendChild(recoDiv)

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