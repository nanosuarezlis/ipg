import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Typography,
  Paper,
  Grid,
} from '@material-ui/core';
import { TrendingUp as TrendingUpIcon, Star as StarIcon } from '@material-ui/icons';
import styled from 'styled-components';

interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  posterUrl: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieListProps {
  movies: Movie[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    margin: '60px auto',
    padding: '20px',
  },
  popularity: {
    display: 'block',
    clear: 'both',
    textAlign: 'right',
    color: '#9c27b0'
  },
  average: {
    display: 'block',
    clear: 'both',
    textAlign: 'right',
    color: '#673ab7'
  },
  row: {
    // borderBottom: '2px solid #673ab7'
  }
}));

const StyledListItem = styled(ListItem)`
  transition: background-color 0.2s ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const TruncatedOverview = styled(Typography)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

function MovieList(props: MovieListProps) {
  const classes = useStyles();
  const { movies } = props;

  return (
    <Paper className={classes.root}>
      <List>
        {movies.map((movie) => (
          <StyledListItem key={movie.id} className={classes.row}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={1}>
                <ListItemAvatar>
                  <Avatar src={movie.posterUrl} />
                </ListItemAvatar>
              </Grid>
              <Grid item xs={8}>
                <ListItemText
                  primary={movie.title}
                  secondary={
                    <React.Fragment>
                      {movie.adult && <Typography variant="caption">+18</Typography>}
                      <TruncatedOverview variant="body2">
                      {movie.overview.length > 200 
                        ? movie.overview.substring(0, 200) + '...' 
                        : movie.overview}
                      </TruncatedOverview>
                    </React.Fragment>
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <ListItemSecondaryAction>
                  <Typography className={classes.popularity} variant="caption"><TrendingUpIcon fontSize="small" /> {movie.popularity}</Typography>
                  <Typography className={classes.average} variant="caption"><StarIcon fontSize="small" /> {movie.vote_average}</Typography>
                </ListItemSecondaryAction>
              </Grid>
            </Grid>
          </StyledListItem>
        ))}
      </List>
    </Paper>
  );
}

export default MovieList;