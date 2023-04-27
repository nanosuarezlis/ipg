import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { createRoot } from 'react-dom/client';

import SearchMovies from './components/SearchMovies';

const theme = createTheme();

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <SearchMovies />
    </React.StrictMode>
  </ThemeProvider>
);