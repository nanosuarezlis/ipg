import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieList, { Movie } from '../../src/client/components/MovieList';

const testMovies: Movie[] = [
  {
    adult: false,
    backdrop_path: 'https://example.com/backdrop.jpg',
    genre_ids: [28, 12, 16, 35],
    id: 1,
    original_language: 'en',
    original_title: 'Test Movie 1',
    overview: 'This is a test movie 1.',
    popularity: 100.0,
    posterUrl: 'https://example.com/poster.jpg',
    release_date: '2023-05-01',
    title: 'Test Movie 1',
    video: false,
    vote_average: 8.0,
    vote_count: 1000,
  },
  {
    adult: false,
    backdrop_path: 'https://example.com/backdrop.jpg',
    genre_ids: [28, 12, 16, 35],
    id: 2,
    original_language: 'en',
    original_title: 'Test Movie 2',
    overview: 'This is a test movie 2.',
    popularity: 99.0,
    posterUrl: 'https://example.com/poster.jpg',
    release_date: '2023-05-01',
    title: 'Test Movie 2',
    video: false,
    vote_average: 7.0,
    vote_count: 800,
  },
  {
    adult: true,
    backdrop_path: 'https://example.com/backdrop.jpg',
    genre_ids: [28, 12, 16, 35],
    id: 3,
    original_language: 'en',
    original_title: 'Test Movie 2',
    overview: 'This is a test movie 2.',
    popularity: 99.0,
    posterUrl: 'https://example.com/poster.jpg',
    release_date: '2023-05-01',
    title: 'Test Movie 3',
    video: false,
    vote_average: 7.0,
    vote_count: 800,
  },
];

describe('MovieList', () => {
  it('renders a list of movies', () => {
    render(<MovieList movies={testMovies} />);
    const movieListItems = screen.getAllByRole('listitem');
    expect(movieListItems.length).toBe(3);
  });

  it('displays the movie titles', () => {
    render(<MovieList movies={testMovies} />);
    const movieTitles = screen.getAllByText(/Test Movie/);
    expect(movieTitles.length).toBe(3);
  });

  it('displays the movie overviews', () => {
    render(<MovieList movies={testMovies} />);
    const movieOverviews = screen.getAllByText(/This is a test movie/);
    expect(movieOverviews.length).toBe(3);
  });

  it('displays the adult rating when the movie is for adults only', () => {
    render(<MovieList movies={[testMovies[2]]} />);
    const adultMovieRating = screen.getByText('18');
    expect(adultMovieRating).toBeInTheDocument();
  });
});



