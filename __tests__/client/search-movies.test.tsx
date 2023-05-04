/**
 * @file Pruebas unitarias del componente MovieList
 * @module __tests__/MovieList
 * @see {@link https://jestjs.io/docs/en/configuration.html Jest Configuration}
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchMovies from '../../src/client/components/SearchMovies';

test('renders the search form and triggers a search', async () => {
  const { getByText, getByRole } = render(<SearchMovies />);
  const searchButton = getByRole('button');
  const input = getByRole('textbox');
  fireEvent.change(input, { target: { value: 'test' } });
  fireEvent.click(searchButton);

  await waitFor(() => {
    expect(getByText(/Total results:/i)).toBeInTheDocument();
  });
});

// test('renders an error message when search query is empty', async () => {
//   const { getByRole, getByText } = render(<SearchMovies />);
//   const searchButton = getByRole('button');
//   fireEvent.click(searchButton);

//   await waitFor(() => {
//     expect(getByText(/Please enter a search query/i)).toBeInTheDocument();
//   });
// });

// test('renders the pagination component', async () => {
//   const { getByText } = render(<SearchMovies />);
//   const totalResults = getByText(/Total results:/i);
//   expect(totalResults).toBeInTheDocument();
// });

// test('changes the page when the user clicks on a pagination link', async () => {
//   const { getByText } = render(<SearchMovies />);
//   const paginationLink = getByText('2');
//   fireEvent.click(paginationLink);

//   await waitFor(() => {
//     expect(getByText(/Total results:/i)).toBeInTheDocument();
//   });
// });


