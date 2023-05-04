// /**
//  * @file Pruebas unitarias del componente MovieList
//  * @module __tests__/MovieList
//  * @see {@link https://jestjs.io/docs/en/configuration.html Jest Configuration}
//  */
// import { render, screen } from '@testing-library/react';
// import React from 'react';
// import MovieList from '../../src/client/components/MovieList';
// import { Movie } from '../../src/client/components/MovieList';

// const movie1: Movie = {
//   adult: false,
//   backdrop_path: '/path/to/image.jpg',
//   genre_ids: [1, 2, 3],
//   id: 1,
//   original_language: 'en',
//   original_title: 'Movie 1',
//   overview: 'Movie 1 Overview',
//   popularity: 123.45,
//   posterUrl: '/path/to/poster.jpg',
//   release_date: '2022-01-01',
//   title: 'Movie 1',
//   video: false,
//   vote_average: 6.7,
//   vote_count: 890,
// };

// const movie2: Movie = {
//   adult: false,
//   backdrop_path: '/path/to/image.jpg',
//   genre_ids: [4, 5],
//   id: 2,
//   original_language: 'en',
//   original_title: 'Movie 2',
//   overview: 'Movie 2 Overview',
//   popularity: 67.89,
//   posterUrl: '/path/to/poster.jpg',
//   release_date: '2022-02-01',
//   title: 'Movie 2',
//   video: false,
//   vote_average: 8.5,
//   vote_count: 1234,
// };

// test('renders list of movies', async () => {
//   const movies: Movie[] = [movie1, movie2];
//   render(<MovieList movies={movies} />);

//   const movieTitles = movies.map((movie) => movie.overview);
//   const movieElements = movieTitles.map((overview) =>
//     screen.getByText(overview)
//   );

//   for (const element of movieElements) {
//     await expect(element).toBeInTheDocument()
//   }
// });
