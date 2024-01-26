import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";
import MovieContainer from '../components/movieContainer/MovieContainer';
import { Box, Container } from '@mui/system';
import SearchFilter from '../components/searchFilter/SearchFilter';
import { Button, Typography } from '@mui/material';
import HeroSection from '../components/heroSection/HeroSection';

const MyMovies = ({ movies, setMovies, currentUser, movieDescription, setMovieDescription, isDarkMode }) => {
  const [filterUserInput, setFilterUserInput] = useState("");
  const [isFavourite, setIsFavourite]=useState("all");

  const favouriteSelector = (filterValue) => {
    setIsFavourite(filterValue)
    console.log(filterValue)
};

let filteredFavMovieList = movies.filter(movies => {
  if(isFavourite === "true") {
    return movies.userReviewId[0].isFavourite === true
  } else if(isFavourite === "false") {
    return movies.userReviewId[0].isFavourite === false
  } else {
    return movies;
}}) 

  setMovieDescription(false)
  const cookies = new Cookies()
  useEffect(() => {
    getMyMovies();
  }, [])

  const getMyMovies = async () => {
    const token = cookies.get('jwt')
    const user = { name: jwtDecode(token.token).username, id: jwtDecode(token.token).userId }
    const user_Id = user.id
    const response = await fetch("http://localhost:3001/movie/my-movies", {
      method: "POST",
      headers: { "Authorization": "Bearer " + token.token, "Content-Type": "application/json" },
      body: JSON.stringify({ user_Id: user_Id })
    });
    const data = await response.json()
    console.log(data)
    setMovies(data)
    setFilterUserInput("")
    setIsFavourite("all")
  };

  return (<>
  <HeroSection/>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <Button color={isDarkMode? 'secondary': 'primary'} onClick={getMyMovies}>Reset</Button>
      <SearchFilter filterUserInput={filterUserInput} setFilterUserInput={setFilterUserInput} movies={movies}setMovies={setMovies} isDarkMode={isDarkMode} setIsFavourite={setIsFavourite} isFavourite={isFavourite} favouriteSelector={favouriteSelector}/>
      <Container maxWidth='md'>
        {movies.length ? <MovieContainer setMovies={setMovies} movies={filteredFavMovieList} currentUser={currentUser} filterUserInput={filterUserInput} movieDescription={movieDescription}/> : <Typography>You haven't added any movies. You can add movies in the home page.</Typography>}
      </Container>
    </Box>
 </> )
}

export default MyMovies