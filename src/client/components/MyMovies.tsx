import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  movieCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[5],
    transition: 'box-shadow 0.2s ease-in-out',
    '&:hover': {
      boxShadow: theme.shadows[10],
    },
  },
  moviePoster: {
    maxWidth: '100%',
  },
}));

export default function MyMovies ({ guestUserId }) {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`/api/movies/${guestUserId}`);
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        My Movies
      </Typography>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
            <div className={classes.movieCard}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={classes.moviePoster}
              />
              <Typography variant="h6">{movie.title}</Typography>
              <Typography variant="body1">
                Your rating: {movie.rating}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};