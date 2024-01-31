import { Typography, Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import HeroSection from '../components/heroSection/HeroSection'
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";
import MovieContainer from '../components/movieContainer/MovieContainer.js';
import { Container } from '@mui/system';

const UserPage = ({movies, setMovies, currentUser}) => {
  const [profileName, setProfileName] = useState("")
    const cookies = new Cookies()
    const params = useParams();
    const readOnly = true;
    const userPageId = params.userId;
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

      async function getUserById() {
        const response = await fetch(`http://localhost:3001/auth/user/${userPageId}`)
        const data = await response.json()
        console.log(data)
        setProfileName(data.username)
    }
      useEffect(() => {
        getMyMovies();
        getUserById();
      }, [])
  return (<>
    <HeroSection/><Box sx={{margin: '20px 0px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>   <Container maxWidth='md'>
    <Typography variant='h2'>{profileName}'s Movies</Typography>
    
    <MovieContainer setMovies={setMovies} movies={movies} currentUser={currentUser} readOnly={readOnly}/>
    </Container></Box>
  
  </>)
}

export default UserPage