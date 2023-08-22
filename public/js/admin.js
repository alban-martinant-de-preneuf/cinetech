/* admin users */
const userTable = document.getElementById('user_table');
const users = await getUsers();

async function getUsers() {
    const users = await fetch('/cinetech/admin/users');
    const usersJson = await users.json();
    return usersJson;
}

async function displayUsers() {
    users.forEach(user => {
        const userRow = document.createElement('tr');

        const userCellFirstname = document.createElement('td');
        const inputFirstname = document.createElement('input');
        inputFirstname.type = 'text';
        inputFirstname.value = user.firstname;
        userCellFirstname.appendChild(inputFirstname);
        userRow.appendChild(userCellFirstname);

        const userCellLastname = document.createElement('td');
        const inputLastname = document.createElement('input');
        inputLastname.type = 'text';
        inputLastname.value = user.lastname;
        userCellLastname.appendChild(inputLastname);
        userRow.appendChild(userCellLastname);

        const userCellEmail = document.createElement('td');
        const inputEmail = document.createElement('input');
        inputEmail.type = 'email';
        inputEmail.value = user.email;
        userCellEmail.appendChild(inputEmail);
        userRow.appendChild(userCellEmail);

        const userCellModif = document.createElement('td');
        const btnModif = document.createElement('input');
        btnModif.type = 'submit';
        btnModif.value = "Modifier";
        activateModifBtn(btnModif, user);
        userCellModif.appendChild(btnModif);
        userRow.appendChild(userCellModif);

        if (user.id_user !== 1) {
            const userCellDelete = document.createElement('td');
            const btnDeleteUser = document.createElement('input');
            btnDeleteUser.type = 'submit';
            btnDeleteUser.value = "Supprimer";
            activateUserDeleteBtn(btnDeleteUser, user);
            userCellDelete.appendChild(btnDeleteUser);
            userRow.appendChild(userCellDelete);
        }

        userTable.appendChild(userRow);
    });
}

function activateModifBtn(button, user) {
    button.addEventListener('click', async (e) => {
        if (confirm('Voulez-vous vraiment modifier cet utilisateur ?')) {
            const inputFirstname = e.target.parentNode.parentNode.children[0].children[0].value;
            const inputLastname = e.target.parentNode.parentNode.children[1].children[0].value;
            const inputEmail = e.target.parentNode.parentNode.children[2].children[0].value;

            if (user.firstname !== inputFirstname
                || user.lastname !== inputLastname
                || user.email !== inputEmail) {
                const res = await fetch('/cinetech/admin/users/modify/' + user.id_user, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstname: inputFirstname,
                        lastname: inputLastname,
                        email: inputEmail
                    })
                });
            }
        }
    });
}

function activateUserDeleteBtn(button, user) {
    button.addEventListener('click', async (e) => {
        if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
            const res = await fetch('/cinetech/admin/users/delete/' + user.id_user);
            if (res.ok) {
                e.target.parentNode.parentNode.remove();
            }
        }
    })
}


function activateCommentDeleteBtn(button, comment) {
    button.addEventListener('click', async (e) => {
        if (confirm('Voulez-vous vraiment supprimer ce commentaire ?')) {
            const res = await fetch('/cinetech/admin/comments/delete/' + comment.id_com);
            if (res.ok) {
                e.target.parentNode.parentNode.remove();
            }
        }
    })
}

displayUsers();

/* admin comments */
const commentTable = document.getElementById('comment_table');

async function getComments() {
    const comments = await fetch('/cinetech/admin/comments');
    const commentsJson = await comments.json();
    return commentsJson;
}

async function displayComments() {
    const comments = await getComments();
    let authors = [];

    for (let user of users) {
        authors[user.id_user] = user.firstname + ' ' + user.lastname;
    }

    comments.forEach(comment => {
        const commentRow = document.createElement('tr');

        const commentCellUser = document.createElement('td');
        authors[comment.id_user] === undefined ? commentCellUser.textContent = 'Utilisateur supprimé' : commentCellUser.textContent = authors[comment.id_user];
        commentRow.appendChild(commentCellUser);

        const commentCellContent = document.createElement('td');
        commentCellContent.textContent = comment.content;
        commentRow.appendChild(commentCellContent);

        const commentCellDelete = document.createElement('td');
        const btnDeleteComment = document.createElement('input');
        btnDeleteComment.type = 'submit';
        btnDeleteComment.value = "Supprimer";
        activateCommentDeleteBtn(btnDeleteComment, comment);
        commentCellDelete.appendChild(btnDeleteComment);
        commentRow.appendChild(commentCellDelete);

        commentTable.appendChild(commentRow);

    });
}

displayComments();

