import request from 'supertest';
import { app } from '../../src/server/server';

describe('GET /movies', () => {
  let server;
  beforeEach(() => {
    server = app.listen();
  });

  afterEach( async () => {
    await server.close();
  });

  it('responds with movie data for a valid query', async () => {
    const response = await request(app).get('/movies?query=batman&page=1&pageSize=20');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('results');
    expect(response.body.results.length).toBeGreaterThan(0);
    expect(response.body.results[0]).toHaveProperty('title');
    expect(response.body.results[0]).toHaveProperty('posterUrl');
  });
});
