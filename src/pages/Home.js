import React from 'react'
import MovieContainer from '../components/movieContainer/MovieContainer'
import SearchBar from '../components/searchBar/SearchBar'

const Home = ({movies, setMovies}) => {
  return (
   <>
   <SearchBar setMovies={setMovies}/>
   <MovieContainer setMovies={setMovies} movies={movies}/>
   </>
  )
}

export default Home