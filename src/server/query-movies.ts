import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.TMDB_API_KEY;

if (!apiKey) {
  throw new Error('API Key must be defined in .env file');
}

async function getMoviePosterUrl(posterPath: string): Promise<string> {
  const apiUrl = `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  const baseUrl = data.images.secure_base_url;
  const posterSize = data.images.poster_sizes[3];
  return `${baseUrl}${posterSize}${posterPath}`;
}

export async function fetchData(query: object): Promise<any> {
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


