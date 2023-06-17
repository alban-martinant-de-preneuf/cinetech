import { getData, loader } from "./modules/module.js";

let currentSlide = 0;
let slideToDisplay = 2;
let windowWidth = window.innerWidth;
let imageSize = 185;

function setSlideToDisplay(imageSize) {
    windowWidth = window.innerWidth;
    if (windowWidth > 9 * imageSize + 10) {
        slideToDisplay = 10;
    } else if (windowWidth > 8 * imageSize + 10) {
        slideToDisplay = 9;
    } else if (windowWidth > 7 * imageSize + 10) {
        slideToDisplay = 8;
    } else if (windowWidth > 6 * imageSize + 10) {
        slideToDisplay = 7;
    } else if (windowWidth > 5 * imageSize + 10) {
        slideToDisplay = 6;
    } else if (windowWidth > 4 * imageSize + 10) {
        slideToDisplay = 5
    } else if (windowWidth > 3 * imageSize + 10) {
        slideToDisplay = 4;
    } else if (windowWidth > 2 * imageSize + 10) {
        slideToDisplay = 3;
    } else {
        slideToDisplay = 2;
    }
}

setSlideToDisplay(imageSize)

function showSlide(index, carouselItems) {
    if (index < 0) {
        index = carouselItems.length - slideToDisplay;
    } else if (index >= carouselItems.length - slideToDisplay + 1) {
        index = 0;
    }

    carouselItems.forEach((item) => {
        item.classList.remove('visible');
    });

    for (let i = index; i < index + slideToDisplay; i++) {
        carouselItems[i].classList.add('visible');
    }

    currentSlide = index;
}

function slideRight(carouselItems) {
    showSlide(currentSlide + slideToDisplay - 1, carouselItems);
}

function slideLeft(carouselItems) {
    showSlide(currentSlide - slideToDisplay + 1, carouselItems);
}

async function getContent(div, request, itemType) {

    const result = await getData(request)
    const items = result.results;
    const carousel = document.createElement('div');
    carousel.id = 'carousel_' + itemType;
    div.appendChild(carousel);
    for (let item of items) {
        carousel.innerHTML += (`
            <div class="carousel_item">
                <a href="/cinetech/${itemType}/${item.id}">
                    <div class="image_container">
                        <img src="https://image.tmdb.org/t/p/w${imageSize}/${item.poster_path}">
                    </div>
                </a>
            </div>
        `)
    }
    const carouselItems = carousel.querySelectorAll('.carousel_item');
    console.log(carouselItems);
    const nextButton = document.createElement('button');
    nextButton.id = 'next_button';
    nextButton.innerHTML = '<span class="chevron right"></span>';
    nextButton.addEventListener('click', () => slideRight(carouselItems));
    const prevButton = document.createElement('button');
    prevButton.id = 'prev_button';
    prevButton.innerHTML = '<span class="chevron left"></span>';
    prevButton.addEventListener('click', () => slideLeft(carouselItems));

    carousel.appendChild(prevButton);
    carousel.appendChild(nextButton);

    showSlide(currentSlide, carouselItems)
    window.addEventListener('resize', () => {
        setSlideToDisplay(imageSize);
        showSlide(currentSlide, carouselItems)
    })

    return div
}

async function dislplayContent() {
    loader();
    const popularDivs = document.getElementsByClassName('popular_div');
    console.log(popularDivs)
    console.log(popularDivs[0]);
    console.log(popularDivs[1])

    const moviesDiv = await getContent(
        popularDivs[0],
        'https://api.themoviedb.org/3/trending/movie/day?language=fr-FR&page=1',
        'movies'
        );
    const tvsDiv = await getContent(
        popularDivs[1],
        'https://api.themoviedb.org/3/trending/tv/day?language=fr-FR&page=1',
        'tvs'
        );
    const mainContainer = document.getElementById('main_container');
    mainContainer.appendChild(moviesDiv);
    mainContainer.appendChild(tvsDiv);
}

dislplayContent().then(() => document.getElementById('loader')?.remove())
