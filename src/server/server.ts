/**
 * Express server that queries and returns movie data from The Movie Database API.
 * @module server
 */
import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { fetchData, createNewGuest, vote } from './api-modules';

/** The port number for the server to listen on. */
const port = process.env.PORT || 3001;

/** The Express app instance. */
export const app = express();

/** Enable cross-origin resource sharing (CORS). */
app.use(cors());
app.use(express.json())

/**
 * Interface representing the query parameters for the '/movies' endpoint.
 */
interface QueryParams {
  query?: string;
  page?: string;
  pageSize?: string;
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
 * @param {number} req.query.page - The page number to fetch.
 * @returns {Promise} A promise that resolves to the movie data fetched from the API.
 */
app.get('/movies', async (req: Request, res: Response) => {
  
  try {
    
    const { query, page = "1", pageSize = "20" } = req.query as QueryParams;
  
    console.log("************")
    console.log(query)
    console.log(page)
    console.log(page)
    console.log("************")
    // if (!query) {
    //   res.status(400).send({ error: 'Invalid query parameter' });
    // }

    console.log("***************************")

    const result = await fetchData({ query, page, pageSize });
    const { total_results: totalResults, total_pages: totalPages } = result;

    res.status(200).send({ ...result, total_results: totalResults, total_pages: totalPages });
    res.end();
  } catch (err) {
    if (!res.headersSent) { 
      res.status(500).send({ error: err.message });
      res.end();
    }
  }
});

app.get('/new_guest', async (req: Request, res: Response) => {
  try {
    const data = await createNewGuest()
    res.status(200).send(data);
  } catch (error) {
    console.error('Error fetching new guest session ID:', error);
    res.status(500).send('Error fetching new guest session ID');
  }
});

app.post('/vote', function(req, res) {
  vote(req, res);
});


/** Start the server. */
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});