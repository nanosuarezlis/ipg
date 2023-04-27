import React, { useState } from 'react';
import { Button, Input } from '@material-ui/core';
import styled from 'styled-components';
import MovieList from './MovieList';
import SearchIcon from '@material-ui/icons/Search';

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const StyledInput = styled(Input)`
  && {
    margin-right: 10px;
  }
`;

function SearchMovies() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch(`http://localhost:3001/movies?query=${query}`);
    const data = await response.json();
    setResults(data.results);
  }

  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput type="text" value={query} onChange={(event) => setQuery(event.target.value)} />
        <Button variant="contained" color="primary" type="submit"><SearchIcon /></Button>
      </StyledForm>
      <MovieList movies={results} />
    </div>
  );
}

export default SearchMovies;