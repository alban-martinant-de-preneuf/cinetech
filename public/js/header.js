// const menuItems = document.querySelectorAll('.menu-items button');

// menuItems.forEach(item => {
//     item.addEventListener('click', async (e) => {
//         window.location.href = e.target.id;
//     })
// })

/* Sélection des éléments HTML */
let link = document.getElementById('link')
let burger = document.getElementById('burger')
let ul = document.querySelector('ul')

/* gestionnaire d'événement sur le a#link pour venir changer l'attribution de la classe .open à la ul et au span#burger */
link.addEventListener('click', function(e) {
  e.preventDefault()
  burger.classList.toggle('open')
  ul.classList.toggle('open')
})