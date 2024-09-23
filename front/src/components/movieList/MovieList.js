import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  TextField,
} from '@mui/material';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const urlap = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const apiUrl = `${urlap}/api/v1/movies`; // Corrected API URL concatenation

    axios
      .get(apiUrl)
      .then((response) => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [urlap]); // Make sure to include urlap in the dependency array

  // Function to filter movies based on the search term
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Container>
        <CircularProgress style={{ margin: '400px' }} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6">Error: {error.message}</Typography>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: "90px" }}>
      <Typography variant="h4" style={{ margin: '20px 0', display: "flex", justifyContent: "center" }}>
        Podcast List
      </Typography>

      {/* Add a search input */}
      <TextField
        sx={{ backgroundColor: "#fff" }}
        label="Search by Title"
        variant="filled"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update the search term state
      />

      <Grid container spacing={3}>
        {filteredMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbId}>
            <Card style={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="400"
                image={movie.poster}
                alt={`${movie.title} Poster`}
              />
              <CardContent style={{ height: '100%', width: '100%' }}>
                <Typography variant="h6" component="div">
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Release Date: {movie.releaseDate}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieList;
