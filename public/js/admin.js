const userTable = document.getElementById('user_table');

async function getUsers() {
    const users = await fetch('/cinetech/admin/users');
    const usersJson = await users.json();
    return usersJson;
}

async function displayUsers() {
    const users = await getUsers();
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
            const btnDelete = document.createElement('input');
            btnDelete.type = 'submit';
            btnDelete.value = "Supprimer";
            activateDeleteBtn(btnDelete, user);
            userCellDelete.appendChild(btnDelete);
            userRow.appendChild(userCellDelete);
        }

        userTable.appendChild(userRow);
    });
}

function activateModifBtn(button, user) {
    button.addEventListener('click', async (e) => {
        const inputFirstname = e.target.parentNode.parentNode.children[0].children[0].value;
        const inputLastname = e.target.parentNode.parentNode.children[1].children[0].value;
        const inputEmail = e.target.parentNode.parentNode.children[2].children[0].value;

        if (user.firstname !== inputFirstname || user.lastname !== inputLastname || user.email !== inputEmail) {
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
            if (res.ok) {
                e.target.parentNode.parentNode.children[0].children[0].value = inputFirstname;
                e.target.parentNode.parentNode.children[1].children[0].value = inputLastname;
                e.target.parentNode.parentNode.children[2].children[0].value = inputEmail;
            }
        }
    });
}

function activateDeleteBtn(button, user) {
    button.addEventListener('click', async (e) => {
        const res = await fetch('/cinetech/admin/users/delete/' + user.id_user);
        if (res.ok) {
            e.target.parentNode.parentNode.remove();
        }
    });
}

displayUsers();