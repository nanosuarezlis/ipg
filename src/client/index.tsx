/**
 * @file Entrypoint de la aplicación
 * @module index
*/

import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, RouteProps, Link, Routes } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import SearchMovies from './components/SearchMovies';
import MyMovies from './components/MyMovies';

/**
 * Tema por defecto de la aplicación
 * @type {Object}
 */
const theme = createTheme();

/**
 * Genera un nuevo ID de usuario cada vez que se carga la aplicación
 * @function
 * @name getGuestUserId
 * @returns {string} ID de usuario
 */
const getGuestUserId = () => {
  return `guest-${Math.floor(Math.random() * 100000)}`;
};

/**
 * Renderiza la aplicación en el elemento DOM con ID 'root'
 * @function
 * @name renderApp
 */
export const renderApp = () => {
  const userId = getGuestUserId();

  createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">Search Movies</Button>
            <Button color="inherit" component={Link} to="/my-movies">My Movies</Button>
          </Toolbar>
        </AppBar>
        <React.StrictMode>
          <Routes>
            <Route path="/" element={<SearchMovies guestUserId={getGuestUserId()} />} />
            <Route path="/my-movies" element={<MyMovies guestUserId={getGuestUserId()} />} />
          </Routes>
        </React.StrictMode>
      </Router>
    </ThemeProvider>
  );
};

// Renderiza la aplicación
renderApp();
