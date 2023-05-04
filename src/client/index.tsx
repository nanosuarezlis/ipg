import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import SearchMovies from './components/SearchMovies';
import MyMovies from './components/MyMovies';
import { UserProvider } from './context/UserContext';

const theme = createTheme();

const renderApp = async () => {
  createRoot(document.getElementById('root')).render(
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/">Search Movies</Button>
              <Button color="inherit" component={Link} to="/my-movies">My Movies</Button>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route
              path="/"
              element={<SearchMovies />}
            />
            <Route
              path="/my-movies"
              element={<MyMovies />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
};

renderApp();
