import React, {useState, useEffect} from 'react'
import MovieContainer from '../components/movieContainer/MovieContainer'
import SearchBar from '../components/searchBar/SearchBar'
import { Container, Box } from '@mui/material'
import HeroSection from '../components/heroSection/HeroSection'
import SlickerCarousel from '../components/carousel/SlickerCarousel'

const Home = ({API_HOST, movies, setMovies, currentUser, movieDescription, isDarkMode}) => {
  movieDescription=true;
  const [landingPageText, setLandingPageText] = useState("Top 20 trending movies")

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
   <>
    <HeroSection movies={movies}/>
    <Container maxWidth='1249px' sx={{ py: 6, padding:'0px'}}>
    <SearchBar API_HOST={API_HOST} setMovies={setMovies} isDarkMode={isDarkMode} getTop20Movies={getTop20Movies} setLandingPageText={setLandingPageText}/>
    <SlickerCarousel movies={movies} isDarkMode={isDarkMode}/>
    <MovieContainer API_HOST={API_HOST} movies={movies} currentUser={currentUser} movieDescription={movieDescription} landingPageText={landingPageText} isDarkMode={isDarkMode}/>
    </Container>
   </>
  )
}

export default Home