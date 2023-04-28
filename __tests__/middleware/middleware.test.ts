import request from 'supertest';
import {app} from '../../src/server/server';

describe('GET /movies', () => {
  it('responds with movie data for a valid query', async () => {
    const response = await request(app).get('/movies?query=batman');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('results');
    expect(response.body.results.length).toBeGreaterThan(0);
    expect(response.body.results[0]).toHaveProperty('title');
    expect(response.body.results[0]).toHaveProperty('posterUrl');
  });

  it('responds with an error for an invalid query', async () => {
    const response = await request(app).get('/movies?query=');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('Invalid query parameter');
  });
  
  it('responds with an error for a missing query parameter', async () => {
    const response = await request(app).get('/movies?hola=jola');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('Invalid query parameter');
  });
});
