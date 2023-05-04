// import { fetchData, getMoviePosterUrl } from '../../src/server/query-movies';

// describe('TMDB module', () => {
//   test('fetchData function returns valid movie data', async (done) => {
//     const result = await fetchData({ query: 'matrix', page: 1, pageSize: 20 });
//     expect(result).toHaveProperty('results');
//     expect(Array.isArray(result.results)).toBe(true);
//     done()
//   });

//   test('getMoviePosterUrl function returns valid URL', async (done) => {
//     const posterPath = '/hEpWvX6Bp79eLxY1kX5ZZJcme5U.jpg';
//     const result = await getMoviePosterUrl(posterPath);
//     expect(result).toContain(posterPath);
//     done()
//   });
// });
