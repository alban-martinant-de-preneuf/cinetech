import { getData } from "./modules/module.js";

function displayContent() {
    moviesDiv = (document.createElement('div'));
    moviesDiv.classList.add('movies_div');

    getData("https://api.themoviedb.org/3/discover/tv?language=fr-FR&page=1&sort_by=popularity.desc").then(result => {
        const items = result.results;
        console.log('series')
        moviesDiv.innerHTML = '<h2>Series</h2>';
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