// import React, { useState, useEffect, useContext } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import {UserContext} from '../context/UserContext';
import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { UserContext } from '../context/UserContext';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DateRangeIcon from '@material-ui/icons/DateRange';
import StarIcon from '@material-ui/icons/Star';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';


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

interface VotedMovie {
  id: number;
  title: string;
  added: string;
  rating: number;
  posterUrl: string;
  vote_average: number;
}

type SortOption = 'date' | 'rating' | 'title';

export default function MyMovies() {
  const classes = useStyles();
  const { userId, userApiId } = useContext(UserContext);
  const [movies, setMovies] = useState([]);
  const [sortOption, setSortOption] = useState<SortOption>('date');

  const fetchMovies = async () => {
    try {
      const response = await fetch(`/api/movies/${userId}`);
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [userId]);

  const getVotedMovies = (): VotedMovie[] => {
    const votedMovies = JSON.parse(localStorage.getItem('votedMovies') || '[]') as VotedMovie[];
    
    switch (sortOption) {
      case 'date':
        return votedMovies.sort((a, b) => new Date(b.added).getTime() - new Date(a.added).getTime());
      case 'rating':
        return votedMovies.sort((a, b) => b.rating - a.rating);
      case 'title':
        return votedMovies.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return votedMovies;
    }
  };

  const handleSortOptionChange = (option: SortOption) => {
    setSortOption(option);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        My Movies
      </Typography>
      <ButtonGroup variant="contained" color="primary">
        <Button onClick={() => handleSortOptionChange('date')}>
          Sort by date
        </Button>
        <Button onClick={() => handleSortOptionChange('rating')}>
          Sort by rating
        </Button>
        <Button onClick={() => handleSortOptionChange('title')}>
          Sort by title
        </Button>
      </ButtonGroup>

      <Grid container spacing={2}>
        {getVotedMovies().map((movie) => (
          <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
            <div className={classes.movieCard}>
              <img
                src={`${movie.posterUrl}`}
                alt={movie.title}
                className={classes.moviePoster}
              />
              <Typography variant="h6">{movie.title}</Typography>
              <Typography variant="body1">
                Your rating: {movie.rating}
              </Typography>
              <Typography variant="body1">
                Average: {movie.vote_average}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
