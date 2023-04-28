import { fetchData, getMoviePosterUrl } from '../../src/server/query-movies';

describe('TMDB module', () => {
  test('fetchData function returns valid movie data', async () => {
    const result = await fetchData({ query: 'matrix' });
    expect(result).toHaveProperty('results');
    expect(Array.isArray(result.results)).toBe(true);
    expect(result.results.length).toBeGreaterThan(0);
    expect(result.results[0]).toHaveProperty('posterUrl');
  });

  test('getMoviePosterUrl function returns valid URL', async () => {
    const posterPath = '/hEpWvX6Bp79eLxY1kX5ZZJcme5U.jpg';
    const result = await getMoviePosterUrl(posterPath);
    expect(result).toContain(posterPath);
  });
});
