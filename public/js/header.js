import { getData } from "./modules/module.js";

// select elements
const link = document.getElementById('link')
const burger = document.getElementById('burger')
const burgerDiv = document.getElementById('burger_div')
const ul = document.querySelector('ul')
const main = document.querySelector('main');

// listen for click on burger
link.addEventListener('click', (e) => {
  e.preventDefault();
  burger.classList.toggle('open');
  ul.classList.toggle('open');
  ul.focus();
  ul.addEventListener('blur', () => {
    burger.classList.remove('open');
    ul.classList.remove('open');
  });
})

// function to create the form to log in
function formLogIn() {
  const form = document.createElement('div');
  form.id = 'form_connection_container';
  form.innerHTML = (
    `<div id="form_connection" class="auth_div">
      <div class="window_title">
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
      <div class="form_bottom">
        Pas encore de compte ? <button id="sign_in">S'inscrire</a></button>
      </div>
    </div>`
  )
  return form;
}

// function to create the form to sign in
function formSignIn() {
  const form = document.createElement('div');
  form.id = 'form_connection_container';
  form.innerHTML = (
    `<div id="form_connection" class="auth_div">
      <div class="window_title">
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
        <div class="form_bottom">
          Déjà un compte ? <button id="log_in">Se connecter</a></button>
        </div>
      </div>
    </div>`
  )
  return form;
}

//  function to activate the close button of the form
function activateCloseButton() {
  const close = document.getElementById('close');
  close.addEventListener('click', () => {
    main.classList.toggle('blur');
    document.querySelector('#form_connection_container').remove();
  })
}

// function to display the form to log in
function displayLogInForm() {
  document.querySelector('#form_connection_container')?.remove();
  document.body.appendChild(formLogIn());
  const signInButton = document.getElementById('sign_in');
  const logInForm = document.getElementById('log_in_form');
  activateCloseButton();

  signInButton.addEventListener('click', () => {
    document.querySelector('#form_connection_container').remove();
    document.body.appendChild(formSignIn());
    activateCloseButton();
    document.getElementById('log_in').addEventListener('click', displayLogInForm);

    const signInForm = document.getElementById('sign_in_form');
    signInForm.addEventListener('submit', submitSignInForm);
  })

  logInForm.addEventListener('submit', submitLogInForm);
}

// function to submit the form to log in
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

// function to submit the form to sign in
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

// listen for click on auth button to display the form
document.getElementById('auth')?.addEventListener('click', (e) => {
  e.preventDefault();
  burger.classList.toggle('open');
  ul.classList.toggle('open');
  main.classList.toggle('blur');
  displayLogInForm();
})

/* search */

// select elements
const searchInput = document.getElementById('search');
const magnifying = document.getElementById('magnifying');
const searchResults = document.getElementById('search_results');

// function to display the results of the search
function displayResults(results) {
  const ul = document.createElement('ul');
  results.forEach(result => {
    if (result.media_type === 'movie') {
      ul.innerHTML += (
        `<li>Film : 
            <a href="/cinetech/movies/${result.id}">
              ${result.title}
            </a>
        </li>`
      )
    } else if (result.media_type === 'tv') {
      ul.innerHTML += (
        `<li>Série : 
            <a href="/cinetech/tvs/${result.id}">
              ${result.name}
            </a>
        </li>`
      )
    }
  })
  searchResults.appendChild(ul);
}

// listen for click on the magnifying glass to display the search input
magnifying.addEventListener('click', () => {
  magnifying.setAttribute('style', 'display: none');
  document.getElementById('search').setAttribute('style', 'border: 1px solid #e9e9e9');
  searchInput.classList.toggle('active');
  searchInput.focus();
  // searchInput.addEventListener('blur', (e) => {
  //   alert(e.currentTarget.value);
  //   alert(e.relatedTarget);
  //   // searchInput.classList.remove('active');
  //   // setTimeout(() => {
  //   //   magnifying.setAttribute('style', 'display: block');
  //   //   document.getElementById('search').setAttribute('style', 'border: 0');
  //   // }, 500);
  //   // document.getElementById('search_results').innerHTML = '';
  // });
  // document.addEventListener('click', (e) => {
  //   if (ul.classList.contains('open')
  //     && e.target !== burger
  //     && e.target !== burgerDiv
  //     && e.target !== ul) {
  //     burger.classList.remove('open');
  //     ul.classList.remove('open');
  //   }
  // });
});

// listen for click outside to close
document.addEventListener('click', (e) => {
  if (
    ul.classList.contains('open')
    && e.target !== burger
    && e.target !== burgerDiv
    && e.target !== ul
    ) {
    burger.classList.remove('open');
    ul.classList.remove('open');
  }

  if (
    searchInput.classList.contains('active')
    && e.target !== searchInput
    && e.target.tagName !== "I"
    && e.target.tagName !== "A"
    && e.target.tagName !== "LI"
    ) {
    searchInput.classList.remove('active');
    setTimeout(() => {
      magnifying.setAttribute('style', 'display: block');
      document.getElementById('search').setAttribute('style', 'border: 0');
    }, 500);
    document.getElementById('search_results').innerHTML = '';
  }
});

// function to fetch data from the API
function search() {
  searchInput.addEventListener('input', async (e) => {
    const searchValue = e.target.value;
    searchResults.innerHTML = '';
    if (searchValue.length > 2) {
      const movies = await getData("https://api.themoviedb.org/3/search/multi?language=fr-FR&query=" + searchValue);
      console.log(movies)
      displayResults(movies.results);
    }
  })
}

search();