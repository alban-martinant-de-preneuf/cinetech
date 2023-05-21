import { options } from "./options.js";

export async function getData(url) {
    const response = await fetch(url, options)
    const result = await response.json();
    return result
}