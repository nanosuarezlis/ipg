/**
 * Express server that queries and returns movie data from The Movie Database API.
 * @module server
 */
import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { fetchData } from './query-movies';

/** The port number for the server to listen on. */
const port = process.env.PORT || 0;

/** The Express app instance. */
export const app = express();

/** Enable cross-origin resource sharing (CORS). */
app.use(cors());

/**
 * Interface representing the query parameters for the '/movies' endpoint.
 */
interface QueryParams {
  query?: string;
}

/**
 * Endpoint to fetch movies from The Movie Database API.
 *
 * @name GET /movies
 * @function
 * @memberof module:server
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {string} req.query.query - The search query.
 * @returns {Promise} A promise that resolves to the movie data fetched from the API.
 */
app.get('/movies', async (req: Request, res: Response) => {
  try {
    if (!req.query) {
      res.status(401).send({ error: 'No query param' });
      return;
    }
  
    const queryParams = req.query as QueryParams;
    const query = queryParams.query;
    
    if (!query) {
      res.status(400).send({ error: 'Invalid query parameter' });
      return;
    }

    const result = await fetchData({ query });
    if (!res.headersSent) { // Verifica si los headers ya han sido enviados
      res.send(result);
    }
  } catch (err) {
    if (!res.headersSent) { // Verifica si los headers ya han sido enviados
      res.status(500).send({ error: err.message });
    }
  }
});

/** Start the server. */
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// app.post('/stop-server', (req, res) => {
//   res.send('Stopping server');
//   process.exit(0);
// });
