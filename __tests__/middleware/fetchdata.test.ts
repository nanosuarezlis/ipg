import { fetchData, getMoviePosterUrl } from '../../src/server/api-modules';

describe('TMDB module', () => {
  test('fetchData function returns valid movie data', async () => {
    const result = await fetchData({ query: 'matrix', page: "1", pageSize: "20" });
    expect(result).toHaveProperty('results');
    expect(Array.isArray(result.results)).toBe(true);
  });

  test('getMoviePosterUrl function returns valid URL', async () => {
    const posterPath = '/hEpWvX6Bp79eLxY1kX5ZZJcme5U.jpg';
    const result = await getMoviePosterUrl(posterPath);
    expect(result).toContain(posterPath);
  });
});
