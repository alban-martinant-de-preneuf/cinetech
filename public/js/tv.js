import { getData, loader } from "./modules/module.js";

function getIdTv() {
    const currentURI = window.location.pathname;
    const parts = currentURI.split('/');
    const idTv = parts.pop();
    return idTv
}

const idTv = getIdTv();

async function displayTv() {
    const detailsDiv = document.getElementById('details_div')
    const tv = await getData("https://api.themoviedb.org/3/tv/" + idTv + "?language=fr-FR");
    const credits = await getData("https://api.themoviedb.org/3/tv/" + idTv + "/credits?language=fr-FR");

    const genres = tv.genres.map(genre => genre.name).join(', ');

    detailsDiv.innerHTML = (
        `<div class="image">
            <img src="https://image.tmdb.org/t/p/w342/${tv.poster_path}">
        </div>
        <div class="tv_details">
            <h2>${tv.name}</h2>
            <h5>${tv.tagline}</h5>
            <p><span class="tv_details_item">Genre(s) :</span> ${genres}</p>
            <p><span class="tv_details_item">Avec :</span> ${credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}</p>
            <p><span class="tv_details_item">note :</span> ${tv.vote_average.toFixed(1)}/10</p>
            <p><span class="tv_details_item">Résumé :</span> ${tv.overview}</p>
        </div>`
    );
}

function activateRemoveFavorite(favoriteBtn) {
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

function activateAddToFavorite(favoriteBtn) {
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
    const addComment = document.getElementById('comment_btn');
    const commentForm = document.getElementById('form_comment_div');
    addComment?.addEventListener('click', () => {
        if (commentForm.style.display === 'block') {
            commentForm.style.display = 'none';
        } else {
            commentForm.style.display = 'block';
        }
    })
}

function activateSendComment() {
    activateAddComment();
    const addComment = document.getElementById('add_comment');
    const commentContent = document.getElementById('comment_content');
    addComment?.addEventListener('click', async () => {
        const comment = commentContent.value;
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
    const commentDiv = document.getElementById('comments_div');
    commentDiv.appendChild(document.createElement('h2')).append('Commentaires');
    const comments = []

    const apiComments = await getData('https://api.themoviedb.org/3/tv/' + idTv + '/reviews?language=en-US&page=1')
    apiComments.results.forEach(comment => {
        comments.push({ "id": comment.id, "author": comment.author, "content": comment.content })
    });

    const localComments = await getData('/cinetech/tvs/getcomments/' + idTv);
    localComments.forEach(comment => {
        comments.push({ "id": comment.id_com, "author": comment.firstname, "content": comment.content })
    });

    let commentIds = [];

    comments.forEach(comment => {
        commentDiv.innerHTML += (
            `<div class="comment_div">
                <div class="author_content">
                    <div class="author">
                        <p class="content_author">${comment.author}</p>
                    </div>
                    <div class="content">
                        <p class="content_com">${comment.content}</p>
                    </div>
                </div>
                <div class="comment_response">
                <button class="res_to_comment" id="res_but_${comment.id}">Répondre</button>
                <button class="display_res_but" id="display_${comment.id}">Afficher les réponses</button>
                    <form action="" method="POST" class="response_form hidden" id="form_res_${comment.id}">
                        <input type="hidden" name="id_parent" value=${comment.id}>
                        <input type="hidden" name="item_type" value="tv">
                        <textarea name="content_mes" id="content_mes" cols="30" rows="10"></textarea>
                        <input type="submit" value="Envoyer">
                    </form>
                <div id="responses_${comment.id}" class="responses_com"></div>
            </div>`
        )
        commentIds.push(comment.id);
    })
    for (let id of commentIds) {
       await displayResponsesToCom(id);
    }
    activateSeeMore();
}

async function getResponsesToCom(idComment) {
    const responses = await getData('/cinetech/tvs/getresponsestocom/' + idComment);
    return responses;
}

async function displayResponsesToCom(idComment) {
    const responsesDiv = document.querySelector('#responses_' + idComment);
    const responses = await getResponsesToCom(idComment);

    responses.forEach(response => {
        responsesDiv.innerHTML += (
            `<div class="response_div">
                <div class="author_content">
                    <div class="author">
                        <p class="content_author">${response.firstname}</p>
                    </div>
                    <div class="content">
                        <p class="content_com">${response.content}</p>
                    </div>
                </div>
            </div>`
        )
    })
}

function activateDisplayResponses() {
    const displayBtns = document.querySelectorAll('.display_res_but');
    displayBtns.forEach(btn => {
        const id = btn.id.split('_').pop();
        const responsesDiv = document.querySelector('#responses_' + id);
        if (responsesDiv.innerHTML === '') {
            btn.style.display = 'none';
        }
        btn.addEventListener('click', (e) => {
            const id = e.target.id.split('_').pop();
            const responsesDiv = document.querySelector('#responses_' + id);
            if (responsesDiv.style.display === 'block') {
                responsesDiv.style.display = 'none';
            } else {
                responsesDiv.style.display = 'block';
            }
        })
    })
}

function activateSeeMore() {
    const content = document.querySelectorAll('.content');
    content.forEach(comment => {
        const lengtCom = comment.querySelector('.content_com').innerText.length
        if (lengtCom < 310) {
            comment.classList.add('short_com');
        } else {
            comment.addEventListener('click', () => {
                comment.classList.toggle('opened');
            })
        }
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
            const response = await fetch('/cinetech/tvs/restocom/' + idTv, {
                method: 'POST',
                body: data
            })
            if (response.ok) {
                window.location.reload();
            } else {
                console.error(response.status);
            }
        })
    })
}

async function displayRecommendations() {
    const reco = await getData("https://api.themoviedb.org/3/tv/" + idTv + "/recommendations?language=fr-FR");

    console.log(reco)
    const recoDiv = document.getElementById('reco_div');
    if (reco.total_results > 0) {
        recoDiv.innerHTML = `<h2>Recommandations</h2>`;
    }

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
    activateSendComment();
    await displayComment();
    activateResponseToCom();
    activateSendResponse();
    activateDisplayResponses();
    await displayRecommendations();
}

displayContent().then(() => document.getElementById('loader')?.remove())