import React, {useEffect} from 'react'
import MovieContainer from '../components/movieContainer/MovieContainer'
import SearchBar from '../components/searchBar/SearchBar'
import { Container, Box } from '@mui/material'
import HeroSection from '../components/heroSection/HeroSection'

const Home = ({movies, setMovies, currentUser, movieDescription, setMovieDescription, isDarkMode}) => {
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
    <HeroSection movies={movies}/>
    <Container maxWidth='md' sx={{ py: 6, padding:'0px'}}>
    <SearchBar setMovies={setMovies} isDarkMode={isDarkMode}/>
    <MovieContainer movies={movies} currentUser={currentUser} movieDescription={movieDescription}/>
    </Container>
   </Box>
  )
}

export default Home