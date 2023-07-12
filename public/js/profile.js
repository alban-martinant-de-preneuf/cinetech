const pwdTable = document.getElementById('pwd_table');
const editPwdBtn = document.getElementById('edit_pwd_btn');
const pwdMsg = document.getElementById('pwd_msg');

editPwdBtn.addEventListener('click', async (e) => {
    if (confirm('Voulez-vous vraiment modifier votre mot de passe ?')) { 
        const oldPwd = document.getElementById('old_pwd').value;
        const newPwd = document.getElementById('new_pwd').value;
        const newPwdConfirm = document.getElementById('new_pwd_confirm').value;
    
        if (newPwd !== newPwdConfirm) {
            pwdMsg.innerHTML = 'La confirmation du mot de passe ne correspond pas';
            return;
        }

        const res = await fetch('/cinetech/profile/changepwd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                oldPwd: oldPwd,
                newPwd: newPwd
            })
        });
        if (res.ok) {
            pwdMsg.innerHTML = 'Mot de passe modifié';
            pwdMsg.setAttribute('style', 'color: green');
            document.getElementById('old_pwd').value = '';
            document.getElementById('new_pwd').value = '';
            document.getElementById('new_pwd_confirm').value = '';
        } else {
            pwdMsg.innerHTML = res.statusText;
            pwdMsg.setAttribute('style', 'color: red');
        }

    }
});