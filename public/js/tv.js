async function getData(url) {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
}

function displayContent() {
    movieDiv = (document.createElement('div'));
    movieDiv.classList.add('movie_div');

    const currentURI = window.location.pathname;
    const parts = currentURI.split('/');
    const idMovie = parts.pop();

    console.log(idMovie);

    getData("https://api.themoviedb.org/3/movie/" + idMovie + "?language=fr-FR").then(movie => {
        console.log(movie)
        movieDiv.innerHTML = (
            `<div class="details_div">
                <div class="image_container">
                    <img src="https://image.tmdb.org/t/p/w342/${movie.poster_path}">
                </div>
                <div class="movie_details">
                    <h2>${movie.title}</h2>
                    <h5>${movie.tagline}</h5>
                    <p>${movie.overview}</p>
                    <p>note : ${movie.vote_average.toFixed(1)}/10</p>
                </div>
            </div>`
        );

    })
    mainContainer.appendChild(movieDiv)

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