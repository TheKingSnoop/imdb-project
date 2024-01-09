import React, {useEffect} from 'react'
import MovieContainer from '../components/movieContainer/MovieContainer'
import SearchBar from '../components/searchBar/SearchBar'
import { Container, Box } from '@mui/material'

const Home = ({movies, setMovies, currentUser, movieDescription, setMovieDescription}) => {
  setMovieDescription(true)
  useEffect(() => {
    async function getTop20Movies() {
        const response = await fetch("http://localhost:3001/tmdb");
        const data = await response.json();
        //console.log('data', data);
        setMovies(data.payload);
    };
    getTop20Movies();
}, [])
  return (
   <Box>
   <Container maxWidth='md' sx={{ py: 6 }}>
   <SearchBar setMovies={setMovies}/>
   <MovieContainer movies={movies} currentUser={currentUser} movieDescription={movieDescription}/>
   </Container>
   </Box>
  )
}

export default Home