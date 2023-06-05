import { getData, loader } from "./modules/module.js";

function getId() {
    const currentURI = window.location.pathname;
    const parts = currentURI.split('/');
    const id = parts.pop();
    const type = parts.pop();
    return [ type, id ]
}

const idItem = getId()[1];
const typeItemPlur = getId()[0];
const typeItemSing = typeItemPlur.slice(0, -1);

async function displayMovie() {
    const detailsDiv = document.getElementById('details_div')
    const movie = await getData("https://api.themoviedb.org/3/" + typeItemSing + "/" + idItem + "?language=fr-FR");
    const credits = await getData("https://api.themoviedb.org/3/" + typeItemSing + "/" + idItem + "/credits?language=fr-FR");

    const genres = movie.genres.map(genre => genre.name).join(', ');

    const title = typeItemSing === 'movie' ? movie.title : movie.name;

    detailsDiv.innerHTML = (
        `<div class="image">
            <img src="https://image.tmdb.org/t/p/w342/${movie.poster_path}">
        </div>
        <div class="movie_details">
            <h2>${title}</h2>
            <h5>${movie.tagline}</h5>
            <p><span class="movie_details_item">Genre(s) :</span> ${genres}</p>
            <p><span class="movie_details_item">Avec :</span> ${credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}</p>
            <p><span class="movie_details_item">note :</span> ${movie.vote_average.toFixed(1)}/10</p>
            <p><span class="movie_details_item">Résumé :</span> ${movie.overview}</p>
        </div>`
    );
}

function activateRemoveFavorite(favoriteBtn) {
    favoriteBtn?.addEventListener('click', () => {
        fetch('/cinetech/favorites/remove' + typeItemSing + '/' + idItem)
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
        fetch('/cinetech/favorites/add' + typeItemSing + '/' + idItem)
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
    if (userFavorites[typeItemPlur].includes(parseInt(idItem))) {
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
        const response = await fetch('/cinetech/' + typeItemPlur + '/addcomment/' + idItem, {
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
    const commentsDiv = document.getElementById('comments_div');
    commentsDiv.appendChild(document.createElement('h2')).append('Commentaires');
    const comments = []

    const apiComments = await getData('https://api.themoviedb.org/3/' + typeItemSing + '/' + idItem + '/reviews?language=en-US&page=1')
    console.log(apiComments.results);
    if (apiComments.results.length === 0) {
        commentsDiv.appendChild(document.createElement('p')).append('Aucun commentaire pour le moment');
    }
    apiComments.results.forEach(comment => {
        comments.push({ "id": comment.id, "author": comment.author, "content": comment.content })
    });

    const localComments = await getData('/cinetech/' + typeItemPlur + '/getcomments/' + idItem);
    localComments.forEach(comment => {
        comments.push({ "id": comment.id_com, "author": comment.firstname, "content": comment.content })
    });

    let commentIds = [];

    comments.forEach(comment => {
        commentsDiv.innerHTML += (
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
                <button class="res_to_comment red small_btn" id="res_but_${comment.id}">Répondre</button>
                <button class="display_res_but red small_btn" id="display_${comment.id}">Afficher les réponses</button>
                    <form action="" method="POST" class="response_form hidden" id="form_res_${comment.id}">
                        <input type="hidden" name="id_parent" value=${comment.id}>
                        <input type="hidden" name="item_type" value="movie">
                        <textarea name="content_mes" id="content_mes" rows="10"></textarea>
                        <button type="submit" class="red small_btn">Envoyer</button>
                    </form>
                <div id="responses_${comment.id}" class="responses_com"></div>
            </div>`
        )
        commentIds.push(comment.id);
    })

    const userConnected = await getData('/cinetech/user/isconnected');
    console.log(userConnected);
    if (userConnected) {
        const responseBtns = document.querySelectorAll('.res_to_comment');
        responseBtns.forEach(btn => {
            btn.style.display = 'inline-block';
        })
    }

    for (let id of commentIds) {
       await displayResponsesToCom(id);
    }
    activateSeeMore();
}

async function getResponsesToCom(idComment) {
    const responses = await getData('/cinetech/' + typeItemPlur + '/getresponsestocom/' + idComment);
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
            const response = await fetch('/cinetech/' + typeItemPlur + '/restocom/' + idItem, {
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
    const reco = await getData("https://api.themoviedb.org/3/" + typeItemSing + "/" + idItem + "/recommendations?language=fr-FR");

    const recoDiv = document.getElementById('reco_div');
    if (reco.total_results > 0) {
        recoDiv.innerHTML = `<h2>Recommandations</h2>`;
    }

    const recoContainer = document.createElement('div');
    recoContainer.id = 'reco_container';
    
    reco.results.forEach(movie => {
        if (movie.poster_path !== null) {
            recoContainer.innerHTML += (
                `<div class="reco_movie">
                    <a href="/cinetech/${typeItemPlur}/${movie.id}">
                        <img src="https://image.tmdb.org/t/p/w154/${movie.poster_path}">
                    </a>
                </div>`
            )
        }
    })
    recoDiv.appendChild(recoContainer);
}

async function displayContent() {
    loader();
    await displayMovie();
    activateFavorite();
    activateSendComment();
    await displayComment();
    activateResponseToCom();
    activateSendResponse();
    activateDisplayResponses();
    await displayRecommendations();
}

displayContent().then(() => document.getElementById('loader')?.remove())