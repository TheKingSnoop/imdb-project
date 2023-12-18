import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";
import MovieContainer from '../components/movieContainer/MovieContainer';
import { Box, Container } from '@mui/system';

const MyMovies = ({ movies, setMovies, currentUser }) => {
  //const [myMovies, setMyMovies] = useState(undefined);
  const cookies = new Cookies()
  useEffect(() => {
    async function getMyMovies() {
      const token = cookies.get('jwt')
      const user = {name: jwtDecode(token.token).username, id: jwtDecode(token.token).userId}
      const user_Id = user.id
      const response = await fetch("http://localhost:3001/movie/my-movies", {
        method: "POST",
        headers: {"Authorization" : "Bearer " + token.token, "Content-Type" : "application/json"},
        body: JSON.stringify({user_Id: user_Id})
      });
      const data = await response.json()
      console.log(data)
      setMovies(data)
    };
    getMyMovies();
  }, [])
  return (
    <Box>
   <Container maxWidth='md' sx={{ py: 6 }}>
   <MovieContainer setMovies={setMovies} movies={movies} currentUser={currentUser}/>
   </Container>
   </Box>
  )
}

export default MyMovies