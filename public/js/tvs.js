import { getData, loader } from "./modules/module.js";

async function pageContent() {
    const moviesDiv = (document.createElement('div'));
    moviesDiv.classList.add('movies_div', 'flex_wrap');

    const result = await getData("https://api.themoviedb.org/3/discover/tv?language=fr-FR&page=1&sort_by=popularity.desc")
    const items = result.results;
    for (let tv of items) {
        moviesDiv.innerHTML += (`
                <a href="/cinetech/tvs/${tv.id}">
                    <div class="item_div">
                        <div class="image_container">
                            <img src="https://image.tmdb.org/t/p/w185/${tv.poster_path}">
                        </div>
                    </div>
                </a>
            `)
    }
    return moviesDiv;
}

loader();
const mainContainer = document.getElementById('main_container');
pageContent().then((content) => {
    mainContainer.appendChild(content);
    document.getElementById('loader')?.remove();
})