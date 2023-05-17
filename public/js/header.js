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