import { getData } from "./modules/module.js";

const link = document.getElementById('link')
const burger = document.getElementById('burger')
const ul = document.querySelector('ul')
// const title = document.getElementById('img_logo');
const main = document.querySelector('main');

link.addEventListener('click', (e) => {
  e.preventDefault();
  burger.classList.toggle('open');
  ul.classList.toggle('open');
})

const authButton = document.getElementById('auth');

function formLogIn() {
  const form = document.createElement('div');
  form.id = 'form_connection';
  form.innerHTML = (
    `<div class="window_title">
      <h4>Se connecter</h4>      
      <button id="close">X</button>
      <hr>
    </div>
    <div id="error"></div>
    <form id=log_in_form>
      <input type="text" name="email" placeholder="E-mail utilisateur">
      <input type="password" name="password" placeholder="Mot de passe">
      <button type="submit">Se connecter</button>
    </form>
    <p>Pas encore de compte ? <button id="sign_in">S'inscrire</a></button>`
  )
  return form;
}

function formSignIn() {
  const form = document.createElement('div');
  form.id = 'form_connection';
  form.innerHTML = (
    `<div class="window_title">
      <h4>Se connecter</h4>      
      <button id="close">X</button>
      <hr>
    </div>
    <div id="error"></div>
      <form id="sign_in_form" action="/cinetech/signin" method="POST">
        <input type="text" name="email" placeholder="E-mail utilisateur">
        <input type="text" name="firstname" placeholder="Prénom">
        <input type="text" name="lastname" placeholder="Nom">
        <input type="password" name="password" placeholder="Mot de passe">
        <input type="password" name="password2" placeholder="Confirmer le mot de passe">
        <button type="submit">S'inscrire</button>
      </form>
        <p>Déjà un compte ? <button id="log_in">Se connecter</a></button>
    </div>`
  )
  return form;
}

function activateCloseButton() {
  const close = document.getElementById('close');
  close.addEventListener('click', () => {
    main.classList.toggle('blur');
    document.querySelector('#form_connection').remove();
  })
}

function displayLogInForm() {
  document.querySelector('#form_connection')?.remove();
  document.body.appendChild(formLogIn());
  const signInButton = document.getElementById('sign_in');
  const logInForm = document.getElementById('log_in_form');
  activateCloseButton();

  signInButton.addEventListener('click', () => {
    document.querySelector('#form_connection').remove();
    document.body.appendChild(formSignIn());
    activateCloseButton();
    document.getElementById('log_in').addEventListener('click', displayLogInForm);

    const signInForm = document.getElementById('sign_in_form');
    signInForm.addEventListener('submit', submitSignInForm);
  })

  logInForm.addEventListener('submit', submitLogInForm);
}

function submitLogInForm(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  fetch('/cinetech/login', {
    method: 'POST',
    body: data
  })
    .then(response => {
      if (response.status === 200) {
        window.location = '/cinetech';
      } else {
        console.log(response.statusText);
        const error = document.getElementById('error');
        error.innerHTML = response.statusText;
      }
    })
}

function submitSignInForm(e) {
  e.preventDefault();
  console.log(e.target);
  const data = new FormData(e.target);
  fetch('/cinetech/register', {
    method: 'POST',
    body: data
  })
    .then(response => {
      if (response.status === 200) {
        document.querySelector('#form_connection').remove();
        displayLogInForm();
      } else {
        console.log(response.statusText);
        const error = document.getElementById('error');
        error.innerHTML = response.statusText;
      }
    })
}

document.getElementById('auth')?.addEventListener('click', (e) => {
  e.preventDefault();
  burger.classList.toggle('open');
  ul.classList.toggle('open');
  main.classList.toggle('blur');
  displayLogInForm();
})

const searchInput = document.getElementById('search');
const searchResults = document.getElementById('search_results');

function displayResults(results) {
  const ul = document.createElement('ul');
  results.forEach(result => {
    ul.innerHTML += (
      `<li>
          <a href="/cinetech/movies/${result.id}">${result.title}</a>
      </li>`
    )
  })
  searchResults.appendChild(ul);
}

function search() {
  searchInput.addEventListener('input', async (e) => {
    const searchValue = e.target.value;
    searchResults.innerHTML = '';
    if (searchValue.length > 2) {
      const movies = await getData("https://api.themoviedb.org/3/search/movie?language=fr-FR&query=" + searchValue);
      displayResults(movies.results);
    }
  })
}

search();