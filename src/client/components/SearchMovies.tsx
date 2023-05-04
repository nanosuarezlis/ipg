/**
 * @file SearchMovies.tsx
 * @desc Componente de buscador y contenedor de resultados.
 * @version 1.2.0
 * @license MIT
 * 
 * @created 2023-04-27
 * @updated 2023-05-02
 * @Author Nano Suárez
 */
import React, { useState, useEffect, useRef } from 'react';
import { Button, Input } from '@material-ui/core';
import styled from 'styled-components';
import MovieList from './MovieList';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from './Pagination';

/**
 * Estilos básicos para el formulario.
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

const SEARCH_QUERY_KEY = 'search_query';

/**
 * Componente de búsqueda de películas.
 * 
 * @component
 */
export default function SearchMovies() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    const searchQuery = localStorage.getItem(SEARCH_QUERY_KEY);
    if (searchQuery) {
      setQuery(searchQuery);
      handleSearch(searchQuery, 1, 20).then(setResponse);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(SEARCH_QUERY_KEY, query);
  }, [query]);

  const setResponse = (response) => {
    const { results, total_pages, total_results } = response;
    setMovies(results);
    setTotalPages(total_pages);
    setTotalResults(total_results)
  };

  const handleSearch = async (query: string, page: number, pageSize: number) => {
    try {
      const params = new URLSearchParams();
      params.append('query', query);
      params.append('page', String(page));
      params.append('pageSize', String(pageSize));
      const apiUrl = `http://localhost:3001/movies?${params.toString()}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      return { error: 'An error occurred while fetching data' };
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputValue = inputRef.current?.value?.trim();

    console.log(inputValue)
    if (typeof inputValue === 'string' && inputValue.length > 0) {
      setCurrentPage(1);
      setQuery(inputValue);
      const result = await handleSearch(inputValue, 1, 20);
      setResponse(result);
    } else {
      setResponse({ error: 'Please enter a search query' });
    }
  }
  
  const handlePageChange = async ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
    const result = await handleSearch(query, selected + 1, 20);
    setResponse(result);
  };

  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput inputRef={(input) => inputRef.current = input} type="text" value={query} onChange={(event) => setQuery(event.target.value)} />
        <Button variant="contained" color="primary" type="submit"><SearchIcon /></Button>
      </StyledForm>
      <MovieList movies={movies} />
      {totalPages > 1 && (
        <Pagination
          pageCount={totalPages}
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
      <div>Total results: {totalResults}</div>
    </div>
  );
}