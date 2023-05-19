const link = document.getElementById('link')
const burger = document.getElementById('burger')
const ul = document.querySelector('ul')
// const title = document.getElementById('img_logo');
const main = document.querySelector('main'); 

// title.addEventListener('click', (e) => {
//   window.location = '/cinetech';
// })

link.addEventListener('click', (e) => {
  e.preventDefault();
  burger.classList.toggle('open');
  ul.classList.toggle('open');
})

const authButton = document.getElementById('auth');

function formLogIn() {
  return (
    `<div class="form_connection">
      <div class="close">
        <button id="close">X</button>
      </div>
      <form action="/cinetech/login" method="POST">
        <input type="text" name="username" placeholder="Nom d'utilisateur">
        <input type="password" name="password" placeholder="Mot de passe">
        <button type="submit">Se connecter</button>
      </form>
      <p>Pas encore de compte ? <button id="sign_in">S'inscrire</a></button>
    </div>`
  )
}

function formSignIn() {
  return (
    `<div class="form_connection">
    <div class="close">
      <button id="close">X</button>
    </div>
    <form action="/cinetech/signin" method="POST">
        <input type="text" name="username" placeholder="Nom d'utilisateur">
        <input type="password" name="password" placeholder="Mot de passe">
        <input type="password" name="password2" placeholder="Confirmer le mot de passe">
        <button type="submit">S'inscrire</button>
    </form>
      <p>Déjà un compte ? <button id="sign_in">Se connecter</a></button>
    </div>`
  )
}

authButton.addEventListener('click', (e) => {
  e.preventDefault();
  burger.classList.toggle('open');
  ul.classList.toggle('open');
  main.classList.toggle('blur');
  document.body.innerHTML += formLogIn();
  const close = document.getElementById('close');
  const signIn = document.getElementById('sign_in');

  close.addEventListener('click', (e) => {
    document.querySelector('.form_connection').remove();
    main.classList.toggle('blur');
  })
})