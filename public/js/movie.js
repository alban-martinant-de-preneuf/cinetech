import { getData } from "./modules/module.js";

function getIdMovie() {
    const currentURI = window.location.pathname;
    const parts = currentURI.split('/');
    const idMovie = parts.pop();
    return idMovie
}

const idMovie = getIdMovie();

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
    const comments = []

    const apiComments = await getData('https://api.themoviedb.org/3/movie/' + idMovie + '/reviews?language=en-US&page=1')
    apiComments.results.forEach(comment => {
        comments.push({ "id": comment.id, "author": comment.author, "content": comment.content })
    });

    const localComments = await getData('/cinetech/movies/getcomments/' + idMovie);
    localComments.forEach(comment => {
        comments.push({ "id": comment.id_com, "author": comment.firstname, "content": comment.content })
    })

    comments.forEach(comment => {
        commentDiv.innerHTML += (
            `<div class="comment_div">
                <p class="content_com">${comment.content}</p>
                <p class="content_author">${comment.author}</p>
                <button class="res_to_comment" id="res_but_${comment.id}">Répondre</button>
                <form action="" method="POST" class="response_form hidden" id="form_res_${comment.id}">
                    <input type="hidden" name="id_parent" value=${comment.id}>
                    <input type="hidden" name="item_type" value="movie">
                    <textarea name="content_mes" id="content_mes" cols="30" rows="10"></textarea>
                    <input type="submit" value="Envoyer">
                </form>
            </div>`
        )
    })
}

async function activateResponseToCom() {
    const responseBtns = document.querySelectorAll('.res_to_comment');
    responseBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.id.split('_').pop();
            document.getElementById('form_res_' + id).classList.toggle('hidden');
        })
    })
}

function activateSendResponse() {
    const responseForms = document.querySelectorAll('.response_form');
    responseForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const response = await fetch('/cinetech/movies/restocom/' + idMovie, {
                method: 'POST',
                body: data
            })
            if (response.ok) {
                // window.location.reload();
            } else {
                console.error(response.status);
            }
        })
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

displayComment()
    .then(() => activateResponseToCom())
    .then(() => activateSendResponse());

displayRecommendations();