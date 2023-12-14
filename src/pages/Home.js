import React from 'react'
import MovieContainer from '../components/movieContainer/MovieContainer'
import SearchBar from '../components/searchBar/SearchBar'
import { Container, Box } from '@mui/material'

const Home = ({movies, setMovies, currentUser}) => {
  return (
   <Box>
   <Container maxWidth='md' sx={{ py: 6 }}>
   <SearchBar setMovies={setMovies}/>
   <MovieContainer setMovies={setMovies} movies={movies} currentUser={currentUser}/>
   </Container>
   </Box>
  )
}

export default Home