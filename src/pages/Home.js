import React, {useEffect} from 'react'
import MovieContainer from '../components/movieContainer/MovieContainer'
import SearchBar from '../components/searchBar/SearchBar'
import { Container, Box } from '@mui/material'
import HeroSection from '../components/heroSection/HeroSection'

const Home = ({API_HOST, movies, setMovies, currentUser, movieDescription, isDarkMode}) => {
  movieDescription=true;

  async function getTop20Movies() {
    const response = await fetch(`http://${API_HOST}/tmdb`);
    const data = await response.json();
    //console.log('data', data);
    setMovies(data.payload);
};
  useEffect(() => {
    getTop20Movies();
}, [])
  return (
   <Box>
    <HeroSection movies={movies}/>
    <Container maxWidth='md' sx={{ py: 6, padding:'0px'}}>
    <SearchBar API_HOST={API_HOST} setMovies={setMovies} isDarkMode={isDarkMode} getTop20Movies={getTop20Movies}/>
    <MovieContainer API_HOST={API_HOST} movies={movies} currentUser={currentUser} movieDescription={movieDescription}/>
    </Container>
   </Box>
  )
}

export default Home