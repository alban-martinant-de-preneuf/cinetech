async function getData(url) {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.results;
}

function displayContent() {
    moviesDiv = (document.createElement('div'));
    moviesDiv.classList.add('movies_div');

    getData("https://api.themoviedb.org/3/discover/movie?language=fr-FR&page=1&sort_by=popularity.desc").then(items => {
        console.log(items)
        moviesDiv.innerHTML = '<h2>Films</h2>';
        for (let film of items) {
            moviesDiv.innerHTML += (`
                <a href="/cinetech/movies/${film.id}">
                    <div class="item_div">
                        <div class="image_container">
                            <img src="https://image.tmdb.org/t/p/w342/${film.poster_path}">
                        </div>
                    </div>
                </a>
            `)
        }
    })
    mainContainer.appendChild(moviesDiv)
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