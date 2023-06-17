import { getData, loader } from "./modules/module.js";

function getId() {
    const currentURI = window.location.pathname;
    const parts = currentURI.split('/');
    const id = parts.pop();
    const type = parts.pop();
    return [type, id]
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

    const imageDiv = document.createElement("div");
    imageDiv.className = "image";

    const image = document.createElement("img");
    image.src = `https://image.tmdb.org/t/p/w342/${movie.poster_path}`;

    const movieDetailsDiv = document.createElement("div");
    movieDetailsDiv.className = "movie_details";

    const titleHeading = document.createElement("h2");
    titleHeading.textContent = title;

    const taglineHeading = document.createElement("h5");
    taglineHeading.textContent = movie.tagline;

    const genresParagraph = document.createElement("p");
    genresParagraph.innerHTML = `<span class="movie_details_item">Genre(s) :</span> ${genres}`;

    const castParagraph = document.createElement("p");
    const castNames = credits.cast.slice(0, 5).map(actor => actor.name).join(', ');
    castParagraph.innerHTML = `<span class="movie_details_item">Avec :</span> ${castNames}`;

    const voteAverageParagraph = document.createElement("p");
    voteAverageParagraph.innerHTML = `<span class="movie_details_item">note :</span> ${movie.vote_average.toFixed(1)}/10`;

    const overviewParagraph = document.createElement("p");
    overviewParagraph.innerHTML = `<span class="movie_details_item">Résumé :</span> ${movie.overview}`;

    // Construire la structure du DOM
    imageDiv.appendChild(image);
    movieDetailsDiv.appendChild(titleHeading);
    movieDetailsDiv.appendChild(taglineHeading);
    movieDetailsDiv.appendChild(genresParagraph);
    movieDetailsDiv.appendChild(castParagraph);
    movieDetailsDiv.appendChild(voteAverageParagraph);
    movieDetailsDiv.appendChild(overviewParagraph);

    // Ajouter les éléments au detailsDiv
    detailsDiv.appendChild(imageDiv);
    detailsDiv.appendChild(movieDetailsDiv);

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
        const commentDiv = document.createElement("div");
        commentDiv.className = "comment_div";

        const authorContentDiv = document.createElement("div");
        authorContentDiv.className = "author_content";

        const authorDiv = document.createElement("div");
        authorDiv.className = "author";

        const authorParagraph = document.createElement("p");
        authorParagraph.className = "content_author";
        authorParagraph.textContent = comment.author;

        const contentDiv = document.createElement("div");
        contentDiv.className = "content";

        const contentParagraph = document.createElement("p");
        contentParagraph.className = "content_com";
        contentParagraph.textContent = comment.content;

        const commentResponseDiv = document.createElement("div");
        commentResponseDiv.className = "comment_response";

        const resButton = document.createElement("button");
        resButton.className = "res_to_comment red small_btn";
        resButton.id = `res_but_${comment.id}`;
        resButton.textContent = "Répondre";

        const displayButton = document.createElement("button");
        displayButton.className = "display_res_but red small_btn";
        displayButton.id = `display_${comment.id}`;
        displayButton.textContent = "Afficher les réponses";

        const responseForm = document.createElement("form");
        responseForm.action = "";
        responseForm.method = "POST";
        responseForm.className = "response_form hidden";
        responseForm.id = `form_res_${comment.id}`;

        const idParentInput = document.createElement("input");
        idParentInput.type = "hidden";
        idParentInput.name = "id_parent";
        idParentInput.value = comment.id;

        const itemTypeInput = document.createElement("input");
        itemTypeInput.type = "hidden";
        itemTypeInput.name = "item_type";
        itemTypeInput.value = "movie";

        const textarea = document.createElement("textarea");
        textarea.name = "content_mes";
        textarea.id = "content_mes";
        textarea.rows = "10";

        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.className = "red small_btn";
        submitButton.textContent = "Envoyer";

        const responsesDiv = document.createElement("div");
        responsesDiv.id = `responses_${comment.id}`;
        responsesDiv.className = "responses_com";

        // Construire la structure du DOM
        authorDiv.appendChild(authorParagraph);
        contentDiv.appendChild(contentParagraph);
        authorContentDiv.appendChild(authorDiv);
        authorContentDiv.appendChild(contentDiv);
        commentResponseDiv.appendChild(resButton);
        commentResponseDiv.appendChild(displayButton);
        responseForm.appendChild(idParentInput);
        responseForm.appendChild(itemTypeInput);
        responseForm.appendChild(textarea);
        responseForm.appendChild(submitButton);
        commentDiv.appendChild(authorContentDiv);
        commentDiv.appendChild(commentResponseDiv);
        commentDiv.appendChild(responseForm);
        commentDiv.appendChild(responsesDiv);

        // Ajouter l'élément commentDiv au parent commentsDiv existant
        commentsDiv.appendChild(commentDiv);

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
        const responseDiv = document.createElement("div");
        responseDiv.className = "response_div";

        const authorContentDiv = document.createElement("div");
        authorContentDiv.className = "author_content";

        const authorDiv = document.createElement("div");
        authorDiv.className = "author";

        const authorParagraph = document.createElement("p");
        authorParagraph.className = "content_author";
        authorParagraph.textContent = response.firstname;

        const contentDiv = document.createElement("div");
        contentDiv.className = "content";

        const contentParagraph = document.createElement("p");
        contentParagraph.className = "content_com";
        contentParagraph.textContent = response.content;

        // Construire la structure du DOM
        authorDiv.appendChild(authorParagraph);
        contentDiv.appendChild(contentParagraph);
        authorContentDiv.appendChild(authorDiv);
        authorContentDiv.appendChild(contentDiv);
        responseDiv.appendChild(authorContentDiv);

        // Ajouter l'élément responseDiv au parent responsesDiv existant
        responsesDiv.appendChild(responseDiv);

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
            const recoMovie = document.createElement("div");
            recoMovie.className = "reco_movie";

            const link = document.createElement("a");
            link.href = "/cinetech/" + typeItemPlur + "/" + movie.id;

            const image = document.createElement("img");
            image.src = "https://image.tmdb.org/t/p/w154/" + movie.poster_path;

            link.appendChild(image);
            recoMovie.appendChild(link);

            recoContainer.appendChild(recoMovie);
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