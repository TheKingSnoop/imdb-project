import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";
import MovieContainer from '../components/movieContainer/MovieContainer';
import { Box, Container } from '@mui/system';
import SearchFilter from '../components/searchFilter/SearchFilter';

const MyMovies = ({ movies, setMovies, currentUser }) => {
  const [filterUserInput, setFilterUserInput] = useState("")
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

  const getMyMovies = async() => {
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


  return (
    <Box sx={{display:'flex', flexDirection: 'column', justifyContent:'center'}}>
    <button onClick={getMyMovies}>view all</button>
      <SearchFilter filterUserInput={filterUserInput} setFilterUserInput={setFilterUserInput} setMovies={setMovies}/>
      <Container maxWidth='md' sx={{ py: 6 }}>
        <MovieContainer setMovies={setMovies} movies={movies} currentUser={currentUser} filterUserInput={filterUserInput}/>
      </Container>
    </Box>
  )
}

export default MyMovies