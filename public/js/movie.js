import { getData } from "./modules/module.js";

function getId() {
    const currentURI = window.location.pathname;
    const parts = currentURI.split('/');
    const idMovie = parts.pop();
    return idMovie
}

const idMovie = getId();

async function displayMovie() {
    const movieDiv = document.getElementById('movie_div')
    const movie = await getData("https://api.themoviedb.org/3/movie/" + idMovie + "?language=fr-FR");
    const credits = await getData("https://api.themoviedb.org/3/movie/" + idMovie + "/credits?language=fr-FR");

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
}

function activateRemoveFavorite(favoriteBtn) {
    favoriteBtn?.addEventListener('click', () => {
        fetch('/cinetech/favorites/removemovie/' + idMovie)
            .then(response => {
                if (response.ok) {
                    window.location.reload();
                } else {
                    console.error(response.status);
                }
            })
    })
}

function activateAddToFavorite(favoriteBtn) {
    favoriteBtn?.addEventListener('click', () => {
        fetch('/cinetech/favorites/addMovie/' + idMovie)
            .then(response => {
                if (response.ok) {
                    window.location.reload();
                } else {
                    console.error(response.status);
                }
            })
    })
}

async function activateFavorite() {
    const favoriteBtn = document.getElementById('favorite_btn');
    if (!favoriteBtn) return;

    const response = await fetch('/cinetech/favoriteslist')
    const userFavorites = await response.json();
    if (userFavorites.movies.includes(parseInt(idMovie))) {
        favoriteBtn.append('Retirer des favoris')
        activateRemoveFavorite(favoriteBtn);
    } else {
        favoriteBtn.append('Ajouter aux favoris')
        activateAddToFavorite(favoriteBtn);
    }
}

function activateAddComment() {
    const addComment = document.getElementById('add_comment');
    const commentContent = document.getElementById('comment_content');
    addComment?.addEventListener('click', async () => {
        const comment = commentContent.value;
        console.log(comment)
        const response = await fetch('/cinetech/movies/addcomment/' + idMovie, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment })
        })
        if (response.ok) {
            window.location.reload();
        } else {
            console.error(response.status);
        }
    })
}

async function displayComment() {
    const commentDiv = document.getElementById('comment_div');
    const comments = await getData('/cinetech/movies/getcomments/' + idMovie);
    console.log(comments)
    comments.forEach(comment => {
        commentDiv.innerHTML += (
            `<div class="comment">
                <p class="content_com">${comment.content}</p>
                <p class="content_author">${comment.firstname}</p>
            </div>`
        )
    })
}

async function displayRecommendations() {
    const reco = await getData("https://api.themoviedb.org/3/movie/" + idMovie + "/recommendations?language=fr-FR");

    const recoDiv = document.getElementById('reco_div');

    recoDiv.innerHTML = `<h2>Recommandations</h2>`;
    reco.results.forEach(movie => {
        if (movie.poster_path !== null) {
            recoDiv.innerHTML += (
                `<div class="reco_movie">
                    <a href="/cinetech/movies/${movie.id}">
                        <img src="https://image.tmdb.org/t/p/w154/${movie.poster_path}">
                    </a>
                </div>`
            )
        }
    })
}

displayMovie()
    .then(() => activateFavorite())
    .then(() => activateAddComment());

displayComment();
displayRecommendations();