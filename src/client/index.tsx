// import React from 'react';
// import ReactDOM from 'react-dom';
// import SearchMovies from './components/SearchMovies';

// ReactDOM.render(
//   <React.StrictMode>
//     <SearchMovies />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// import React from 'react';
// import ReactDOM from 'react-dom';
// import SearchMovies from './components/SearchMovies';
// import { createRoot } from 'react-dom/client';

// const root = createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <SearchMovies />
//   </React.StrictMode>
// );

import React from 'react';
import { createRoot } from 'react-dom/client';
import SearchMovies from './components/SearchMovies';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchMovies />
  </React.StrictMode>
);

