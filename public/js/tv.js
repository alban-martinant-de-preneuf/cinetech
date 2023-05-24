import { getData, loader } from "./modules/module.js";

function getId() {
    const currentURI = window.location.pathname;
    const parts = currentURI.split('/');
    const idTv = parts.pop();
    return idTv
}

const idTv = getId();

async function displayTv() {
    const tvDiv = document.getElementById('tv_div');
    const tv = await getData("https://api.themoviedb.org/3/tv/" + idTv + "?language=fr-FR");
    const credits = await getData("https://api.themoviedb.org/3/tv/" + idTv + "/credits?language=fr-FR");

    const genres = tv.genres.map(genre => genre.name).join(', ');

    tvDiv.innerHTML = (
        `<div class="details_div">
            <div class="image_container">
                <img src="https://image.tmdb.org/t/p/w342/${tv.poster_path}">
            </div>
            <div class="tv_details">
                <p>Genre(s) : ${genres}</p>
                <p>Avec : ${credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}</p>
                <h2>${tv.name}</h2>
                <h5>${tv.tagline}</h5>
                <p>${tv.overview}</p>
                <p>note : ${tv.vote_average.toFixed(1)}/10</p>
            </div>
        </div>`
    );
}

async function activateRemoveFavorite(favoriteBtn) {
    favoriteBtn?.addEventListener('click', () => {
        fetch('/cinetech/favorites/removetv/' + idTv)
            .then(response => {
                if (response.ok) {
                    window.location.reload();
                } else {
                    console.error(response.status);
                }
            })
    })
}

async function activateAddToFavorite(favoriteBtn) {
    favoriteBtn?.addEventListener('click', () => {
        fetch('/cinetech/favorites/addTv/' + idTv)
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
    if (userFavorites.tvs.includes(parseInt(idTv))) {
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
        const response = await fetch('/cinetech/tvs/addcomment/' + idTv, {
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
    const comments = await getData('/cinetech/tvs/getcomments/' + idTv);
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
    const reco = await getData("https://api.themoviedb.org/3/tv/" + idTv + "/recommendations?language=fr-FR");

    const recoDiv = document.getElementById('reco_div');

    recoDiv.innerHTML = `<h2>Recommandations</h2>`;
    reco.results.forEach(tv => {
        if (tv.poster_path !== null) {
            recoDiv.innerHTML += (
                `<div class="reco_tv">
                    <a href="/cinetech/tvs/${tv.id}">
                        <img src="https://image.tmdb.org/t/p/w154/${tv.poster_path}">
                    </a>
                </div>`
            )
        }
    })
}

async function displayContent() {
    loader();
    await displayTv();
    activateFavorite();
    activateAddComment();
    await displayComment();
    activateResponseToCom();
    activateSendResponse();
    await displayRecommendations();
}

displayContent().then(() => document.getElementById('loader')?.remove())