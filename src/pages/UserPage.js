import { Typography, Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import HeroSection from '../components/heroSection/HeroSection'
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";
import MovieContainer from '../components/movieContainer/MovieContainer.js';

const UserPage = ({movies, setMovies, currentUser}) => {
    const cookies = new Cookies()
    const params = useParams();
    const readOnly = true;
    const userPageId = params.userId;
    console.log(userPageId)
    const getMyMovies = async () => {
        const token = cookies.get('jwt')
        const user = { name: jwtDecode(token.token).username, id: jwtDecode(token.token).userId }
        
        const response = await fetch("http://localhost:3001/movie/my-movies", {
          method: "POST",
          headers: { "Authorization": "Bearer " + token.token, "Content-Type": "application/json" },
          body: JSON.stringify({ user_Id: userPageId })
        });
        const data = await response.json()
        //console.log(data)
        setMovies(data)
        // setFilterUserInput("")
        // setIsFavourite("all")
      };
      useEffect(() => {
        getMyMovies();
      }, [])
  return (
    <Box>  <HeroSection/>
    <Typography></Typography>
    <MovieContainer setMovies={setMovies} movies={movies} currentUser={currentUser} readOnly={readOnly}/>
    </Box>
  
  )
}

export default UserPage