const link = document.getElementById('link')
const burger = document.getElementById('burger')
const ul = document.querySelector('ul')
const title = document.getElementById('img_logo');

title.addEventListener('click', (e) => {
  window.location = '/cinetech';
})

link.addEventListener('click', (e) => {
  e.preventDefault();
  burger.classList.toggle('open');
  ul.classList.toggle('open');
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
      console.log(movies)
      displayResults(movies.results);
    }
  })
}

search();