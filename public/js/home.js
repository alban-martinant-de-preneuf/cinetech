const mainContainer = document.getElementById('main_container');
console.log(mainContainer)
async function getPopulars() {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTI3ZmY0Yzg0Njk4MTM2YTAzYzJjYjVkMmUzNDliMyIsInN1YiI6IjY0NjFlZDhhZWY4YjMyMDExYjE0N2NlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pLIoyG8msCcMdFu39dLleYXaU7cMkM4hUX-ndF_Cli4'
        }
    };

    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1', options)
    const popular = await response.json();
    return popular.results
}

getPopulars().then(films => {
    for (let film of films) {
        console.log(film.title)
        mainContainer.innerHTML += film.title + "<br>"
    }
})