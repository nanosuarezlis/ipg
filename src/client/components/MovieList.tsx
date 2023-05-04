/**
 * @file MovieList.tsx
 * @desc Componente de lista de películas que muestra una lista de películas.
 * @version 1.0.0
 * @license MIT
 * 
 * @created 2023-04-27
 * @updated 2023-04-27
 * @author Nano Suárez
 */

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

/**
 * @typedef {Object} Movie
 * @property {boolean} adult - Indica si la película es para mayores de 18 años.
 * @property {?string} backdrop_path - La URL de la imagen de fondo de la película.
 * @property {number[]} genre_ids - Los IDs de los géneros de la película.
 * @property {number} id - El ID de la película.
 * @property {string} original_language - El idioma original de la película.
 * @property {string} original_title - El título original de la película.
 * @property {string} overview - Una descripción general de la película.
 * @property {number} popularity - La popularidad de la película.
 * @property {?string} posterUrl - La URL del póster de la película.
 * @property {string} release_date - La fecha de lanzamiento de la película.
 * @property {string} title - El título de la película.
 * @property {boolean} video - Indica si la película tiene un video asociado.
 * @property {number} vote_average - El promedio de votos de la película.
 * @property {number} vote_count - El número de votos para la película.
 */
export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  posterUrl: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/**
 * Propiedades para el componente MovieList
 * @typedef {Object} MovieListProps
 * @property {Movie[]} movies - Lista de películas a mostrar.
 */
interface MovieListProps {
  movies: Movie[];
  //results: any[];
}

/**
 * Custom styles for MovieList component
 * @param {Object} theme - Material UI theme object
 * @return {Object} - Custom styles
 */
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

/**
 * Lista de películas estilizada.
 */
const StyledListItem = styled(ListItem)`
  transition: background-color 0.2s ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

/**
 * Overview aplicando el truncate para cuando tiene más de 200 caracteres el overview.
 */
const TruncatedOverview = styled(Typography)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;


/**
 * Representa una lista de películas.
 * 
 * @param {object} props - Los props para el componente.
 * @param {Movie[]} props.movies - La lista de películas a mostrar.
 * @returns {JSX.Element} - La lista de películas renderizada.
 * 
 * @example
 * <MovieList movies={movies} />
 */
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
                />
                <div>
                  <TruncatedOverview variant="body2">
                    {movie.overview.length > 200
                      ? movie.overview.substring(0, 200) + "..."
                      : movie.overview}
                  </TruncatedOverview>
                </div>
                <ListItemText
                  primary={movie.adult && +18}
                />
              </Grid>
              
              <Grid item xs={3}>
                <ListItemSecondaryAction>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Typography className={classes.popularity} variant="caption"><TrendingUpIcon fontSize="small" /> {movie.popularity}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.average} variant="caption"><StarIcon fontSize="small" /> {movie.vote_average}</Typography>
                    </Grid>
                  </Grid>
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