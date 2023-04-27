/**
 * @file SearchMovies.tsx
 * @desc Componente de buscador y contenedor de resultados.
 * @version 1.0.0
 * @license MIT
 * 
 * @created 2023-04-27
 * @updated 2023-04-27
 * @author Nano Suárez
 */
import React, { useState } from 'react';
import { Button, Input } from '@material-ui/core';
import styled from 'styled-components';
import MovieList from './MovieList';
import SearchIcon from '@material-ui/icons/Search';

/**
 * Componente de búsqueda de películas.
 * 
 * @component
 */
function SearchMovies() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  /**
   * Maneja la presentación de los resultados de búsqueda de películas.
   * 
   * @async
   * @function handleSubmit
   * @param {Event} event - Evento de envío de formulario.
   * @returns {Promise<void>}
   */
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

/**
 * Estilos básicos para la lista.
 */
const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

/**
 * Estilos básicos para el input.
 */
const StyledInput = styled(Input)`
  && {
    margin-right: 10px;
  }
`;

export default SearchMovies;
