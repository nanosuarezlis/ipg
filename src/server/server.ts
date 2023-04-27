import express from 'express';
import cors from 'cors';
import { fetchData } from './query-movies';

const port = process.env.PORT || 3001;
const app = express();
app.use(cors());

app.get('/movies', async (req, res) => {
  const query = req.query.query as string;
  console.log(`Received query: ${query}`);

  try {
    const result = await fetchData({ query });
    console.log(result)
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
