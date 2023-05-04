import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { UserContext } from '../context/UserContext';

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  posterUrl: string
}

interface Props {
  movie: Movie;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const MovieCard: React.FC<Props> = ({ movie }) => {
  const classes = useStyles();
  const [voteCount, setVoteCount] = useState(movie.vote_average);
  const [selectedValue, setSelectedValue] = useState<number | ''>(movie.vote_average);
  const { userId, userApiId, setUserData } = useContext(UserContext);
  
  useEffect(() => {
    setUserData();
    const votedMovies = JSON.parse(localStorage.getItem('votedMovies')) || [];
    const votedMovie = votedMovies.find((record: any) => record.id === movie.id);

    if (votedMovie && typeof votedMovie.rating === 'number') {
      setSelectedValue(votedMovie.rating);
    }
  }, []);

  // const handleVoteClick = async () => {
  //   const response = await fetch(`http://localhost:3001/vote?id=${movie.id}&rating=${selectedValue}&guestUser=${userApiId}`, { method: 'POST' });
  //   const data = await response.json();
  //   setVoteCount(data.vote_average);
  
  //   const votedMovies = JSON.parse(localStorage.getItem('votedMovies')) || [];
  //   const movieIndex = votedMovies.findIndex((votedMovie: Movie) => votedMovie.id === movie.id);
  //   if (movieIndex >= 0) {
  //     // Sobrescribir la nota de la película existente
  //     votedMovies[movieIndex].rating = selectedValue;
  //   } else {
  //     // Agregar una nueva entrada para la película
  //     votedMovies.push({
  //       id: movie.id,
  //       rating: selectedValue,
  //       posterUrl: movie.posterUrl,
  //       title: movie.title,
  //       vote_average: movie.vote_average,
  //       added: new Date(),
  //     });
  //   }
  //   localStorage.setItem('votedMovies', JSON.stringify(votedMovies));
  // };
  const handleVoteClick = async (): Promise<void> => {
    const response = await fetch(`http://localhost:3001/vote?id=${movie.id}&rating=${selectedValue}&guestUser=${userApiId}`, { method: 'POST' });
    const data = await response.json();
    setVoteCount(data.vote_average);
  
    const votedMovies: {
      id: number;
      rating: number;
      posterUrl: string;
      title: string;
      vote_average: number;
      added: Date;
    }[] = JSON.parse(localStorage.getItem('votedMovies') || '[]');
  
    // Buscar si ya existe una votación para la película
    const index = votedMovies.findIndex((record) => record.id === movie.id);
  
    // Si ya existe, actualizar la nota en lugar de agregar un nuevo registro
    if (index >= 0) {
      if (typeof selectedValue === "number") {
        votedMovies[index].rating = selectedValue;
      }
    } else {
      // Si no existe, agregar un nuevo registro
      if (typeof selectedValue === "number") {
        const record = { id: movie.id, rating: selectedValue, posterUrl: movie.posterUrl, title: movie.title, vote_average: movie.vote_average, added: new Date() }
        votedMovies.push(record);
      }
    }
  
    localStorage.setItem('votedMovies', JSON.stringify(votedMovies));
  };  
  
  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedValue(event.target.value as number | '');
  };

  const handleSubmitClick = () => {
    handleVoteClick();
  };

  return (
    <div className="card">
      <div className="card-body">
        <FormControl className={classes.formControl}>
          <InputLabel id="vote-label">Vote</InputLabel>
          <Select
            labelId="vote-label"
            id="vote-select"
            value={Number(selectedValue)}
            onChange={handleSelectChange}
          >
            <MenuItem value=""><em>Not voted yet</em></MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
        <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmitClick}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default MovieCard;
