import React, { useState } from 'react';

function SearchMovies() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch(`/movies?query=${query}`);
    const data = await response.json();
    setResults(data.results);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={(event) => setQuery(event.target.value)} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchMovies;
