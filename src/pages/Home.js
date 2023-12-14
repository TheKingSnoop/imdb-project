import React from 'react'
import MovieContainer from '../components/movieContainer/MovieContainer'
import SearchBar from '../components/searchBar/SearchBar'
import { Container, Box } from '@mui/material'

const Home = ({movies, setMovies}) => {
  return (
   <Box>
   <Container maxWidth='md' sx={{ py: 6 }}>
   <SearchBar setMovies={setMovies}/>
   {/* <MovieContainer setMovies={setMovies} movies={movies}/> */}
   </Container>
   </Box>
  )
}

export default Home