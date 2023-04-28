/**
 * Loads configuration from environment variables and fetches movie data from The Movie Database API.
 * @module TMDB
 */

import dotenv from 'dotenv';

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

type QueryParams = {
  query: string;
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
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query.query}`;
  const response = await fetch(apiUrl);
  
  if (response.status !== 200) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  
  const data = await response.json();

  const moviesWithPosterUrls = await Promise.all(
    data.results.map(async (movie) => {
      const posterUrl = await getMoviePosterUrl(movie.poster_path);
      return { ...movie, posterUrl };
    })
  );

  return { ...data, results: moviesWithPosterUrls }
}