import { options } from "./options.js";

export async function getData(url) {
    const response = await fetch(url, options)
    const result = await response.json();
    return result
}

export function loader() {
    const loaderDiv = document.createElement('div');
    loaderDiv.id = 'loader';
    loaderDiv.innerHTML = (
        `<div class="spinner"></div>`
    );
    document.body.appendChild(loaderDiv);
}