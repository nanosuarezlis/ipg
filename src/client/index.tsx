/**
 * @file Entrypoint de la aplicación
 * @module index
 */

import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { createRoot } from 'react-dom/client';

import SearchMovies from './components/SearchMovies';

/**
 * Tema por defecto de la aplicación
 * @type {Object}
 */
const theme = createTheme();

/**
 * Renderiza la aplicación en el elemento DOM con ID 'root'
 * @function
 * @name renderApp
 */
export const renderApp = () => {
  console.log("document.getElementById('root'):::::::")
  console.log(document.getElementById('root'))
  console.log("*******")
  console.log(document)
  console.log("---------")

  createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <SearchMovies />
      </React.StrictMode>
    </ThemeProvider>
  );
};

// Renderiza la aplicación
renderApp();
