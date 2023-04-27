import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.TMDB_API_KEY;

if (!apiKey) {
  throw new Error('API Key must be defined in .env file');
}

export async function fetchData(query: string): Promise<any> {
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
  console.log(apiUrl);

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return await response.json();
}


