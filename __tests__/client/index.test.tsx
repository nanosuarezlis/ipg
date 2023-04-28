
/**
 * @file Pruebas de integración del componente SearchMovies
 * @module __tests__/client/index
 * @see {@link https://jestjs.io/docs/en/configuration.html Jest Configuration}
 */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { createRoot } from 'react-dom/client';
import SearchMovies from '../../src/client/components/SearchMovies';

const theme = createTheme();

test('renders SearchMovies component', () => {
  render(
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <SearchMovies />
      </React.StrictMode>
    </ThemeProvider>
  );
  const searchMovies = screen.getByRole('textbox');
  expect(searchMovies).toBeInTheDocument();
});
