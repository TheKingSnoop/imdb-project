import React, { useState, useEffect } from 'react'
import MovieContainer from '../components/movieContainer/MovieContainer'
import SearchBar from '../components/searchBar/SearchBar'
import { Container, Box, Typography, Button } from '@mui/material'
import HeroSection from '../components/heroSection/HeroSection'
import ElasticCarousel from '../components/carousel/ElasticCarousel'
import Top20ElasticCarousel from '../components/carousel/Top20ElasticCarousel'
import SnackBarComponent from '../components/snackBar/SnackBarComponent'

const Home = ({ API_HOST, movies, setMovies, currentUser, movieDescription, isDarkMode }) => {
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [sciFiMovies, setSciFiMovies] = useState([]);

  const [landingPageText, setLandingPageText] = useState("Top 20 trending movies")

  async function getTop20Movies() {
    const response = await fetch(`http://${API_HOST}/tmdb`);
    const data = await response.json();
    setMovies(data.payload);
  };

    const getTop20HorrorMovies = async(genreId) => {
    const response = await fetch(`http://${API_HOST}/tmdb/genre/${genreId}`)
    const data = await response.json()
    setHorrorMovies(data.payload)
  };
  const getTop20ComedyMovies = async( genreId) => {
    const response = await fetch(`http://${API_HOST}/tmdb/genre/${genreId}`)
    const data = await response.json()
    setComedyMovies(data.payload)
  };
  const getTop20SciFiMovies = async( genreId) => {
    const response = await fetch(`http://${API_HOST}/tmdb/genre/${genreId}`)
    const data = await response.json()
    setSciFiMovies(data.payload)
  };
  useEffect(() => {
    console.log('rendering')
    getTop20Movies();
    //Horror
    getTop20HorrorMovies(27)
    //Comedy
    getTop20ComedyMovies(35);
    //SciFi
    getTop20SciFiMovies(878)
  }, [])
  return (
    <>
      <HeroSection movies={movies} />
      <Container maxWidth='1024px' sx={{ py: 3, px: '0px'}}>
        <SearchBar API_HOST={API_HOST} setMovies={setMovies} isDarkMode={isDarkMode} getTop20Movies={getTop20Movies} setLandingPageText={setLandingPageText} />
        <Top20ElasticCarousel movies={movies} isDarkMode={isDarkMode} currentUser={currentUser} title={landingPageText} API_HOST={API_HOST}/>
        <ElasticCarousel movies={horrorMovies} isDarkMode={isDarkMode} title={'Horror'} currentUser={currentUser} API_HOST={API_HOST}/>
        <ElasticCarousel movies={comedyMovies} isDarkMode={isDarkMode} title={'Comedy'} currentUser={currentUser} API_HOST={API_HOST}/>
        <ElasticCarousel movies={sciFiMovies} isDarkMode={isDarkMode} title={'Sci-Fi'} currentUser={currentUser} API_HOST={API_HOST}/>
        {/* <MovieContainer API_HOST={API_HOST} movies={movies} currentUser={currentUser} landingPageText={landingPageText} isDarkMode={isDarkMode} /> */}
       </Container>
    </>
  )
}

export default Home