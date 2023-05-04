// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
// import { render, screen, fireEvent } from '@testing-library/react';
// import React from 'react';
// import SearchMovies from '../../src/client/components/SearchMovies';

// const testserver = setupServer(
//   rest.get('http://localhost:3001/movies?query=batma&page=1', (req, res, ctx) => {
//     const query = req.url.searchParams.get('query') || "batman";
//     const page = parseInt(req.url.searchParams.get('page'), 10) || 1;
//     const pageSize = parseInt(req.url.searchParams.get('pageSize'), 10) || 20;
//     return res(
//       ctx.json({
//         results: [
//           { id: 1, title: `Movie 1 ${query}`, poster_path: 'movie1.jpg' },
//           { id: 2, title: `Movie 2 ${query}`, poster_path: 'movie2.jpg' },
//         ],
//         total_pages: 2,
//         total_results: 4,
//       })
//     );
//   })
// );

// beforeAll(() => testserver.listen());
// afterEach(() => {
//   testserver.resetHandlers();
//   jest.clearAllMocks();
// });
// afterAll(() => testserver.close());

// test('should load the first page of search results on initial render', async () => {
//   const query = 'star wars';

//   const {container} = render(<SearchMovies />);

//   await screen.findByText(`Movie 1 ${query}`);
//   await screen.findByText(`Movie 2 ${query}`);

//   expect(screen.getByText('Movie 1')).toBeInTheDocument();
//   expect(screen.getByText('Movie 2')).toBeInTheDocument();

//   const nextPageButton = screen.getByText('2');
//   fireEvent.click(nextPageButton);

//   await screen.findByText(`Movie 1 ${query}`);
//   await screen.findByText(`Movie 2 ${query}`);

//   expect(screen.getByText('Movie 1')).toBeInTheDocument();
//   expect(screen.getByText('Movie 2')).toBeInTheDocument();
// });
