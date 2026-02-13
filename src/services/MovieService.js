import Movie from "../models/Movie.js";

const BASE_URL = "http://localhost:3001";

export async function getMovies() {
    const response = await fetch(`${BASE_URL}/movies`)
    const data = await response.json();

    return data.map(movie => new Movie(movie.id, movie.title, movie.price));
}