/**
 * Loads configuration from environment variables and fetches movie data from The Movie Database API.
 * @module TMDB
 */

import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

/**
 * The API key for The Movie Database API. Must be defined in a .env file.
 * @constant {string}
 * @throws Will throw an error if the API key is not defined.
 */
const apiKey = process.env.TMDB_API_KEY;

if (!apiKey) {
  throw new Error('API Key must be defined in .env file');
}

type QueryParams = {
  query: string;
  page: string;
  pageSize: string;
}

/**
 * Returns the URL for a given movie poster path, using The Movie Database API configuration.
 * @async
 * @function
 * @param {string} posterPath - The path to the movie poster image.
 * @returns {Promise<string>} The URL for the movie poster image.
 */
export async function getMoviePosterUrl(posterPath: string): Promise<string> {
  const apiUrl = `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  const baseUrl = data.images.secure_base_url;
  const posterSize = data.images.poster_sizes[3];
  
  return `${baseUrl}${posterSize}${posterPath}`;
}

/**
 * Returns the URL for a given movie poster path, using The Movie Database API configuration.
 * @async
 * @function
 * @param {string} posterPath - The path to the movie poster image.
 * @returns {Promise<string>} The URL for the movie poster image.
 */
export async function createNewGuest(): Promise<string> {

  const apiUrl = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`;
  console.log(apiUrl)
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log("Creating new guest!")
  console.log(data)
  
  return data;
}

export async function vote(req, res) {
  const movieId = req.query.id;
  const rating = req.query.rating;
  const guestUser = req.query.guestUser;

  const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${guestUser}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      value: rating
    })
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al votar');
  }
}

/**
 * Fetches movie data from The Movie Database API.
 * @async
 * @function
 * @param {object} query - The search query object.
 * @returns {Promise<object>} The movie data object.
 * @throws Will throw an error if the API request fails.
 */
export async function fetchData(query: QueryParams): Promise<any> {
  console.log(query)
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query.query}&page=${query.page}&language=es-ES&page_size=${query.pageSize || "20"}`;
  const response = await fetch(apiUrl);

  if (response.status !== 200) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  if (!response) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();

  const moviesWithPosterUrls = await Promise.all(
    data.results.map(async (movie) => {
      const posterUrl = await getMoviePosterUrl(movie.poster_path);
      return { ...movie, posterUrl };
    })
  );

  console.log(`${moviesWithPosterUrls.length} results for ${query}, pages: ${data.total_pages}, total results: ${data.total_results}`)

  return { ...data, results: moviesWithPosterUrls, total_results: data.total_results, total_pages: data.total_pages };
}

