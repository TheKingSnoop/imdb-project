import { Typography, Box, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import HeroSection from '../components/heroSection/HeroSection'
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import MovieContainer from '../components/movieContainer/MovieContainer.js';
import { useNavigate } from 'react-router-dom';

const UserPage = ({ API_HOST, movies, setMovies, currentUser }) => {

  const [profileName, setProfileName] = useState("")

  const cookies = new Cookies();
  const navigate = useNavigate();
  const params = useParams();
  const token = cookies.get('jwt')
  const readOnly = true;
  const userPageId = params.userId;

  const getMyMovies = async () => {

    const response = await fetch(`http://${API_HOST}/movie/my-movies`, {
      method: "POST",
      headers: { "Authorization": "Bearer " + token.token, "Content-Type": "application/json" },
      body: JSON.stringify({ user_Id: userPageId })
    });
    const data = await response.json()
    setMovies(data)
  };

  async function getUserById() {
    const response = await fetch(`http://${API_HOST}/auth/user/${userPageId}`, {
      headers: { "Authorization": "Bearer " + token.token, "Content-Type": "application/json" },
    })
    const data = await response.json()

    if (data && data.error && data.error.message === "Unauthorized") {
      alert('Session expired, please login again.')
      navigate('/login')
    } else {
      setProfileName(data.username);
    }
  };

  useEffect(() => {
    getMyMovies();
    getUserById();
  }, []);

  return (
    <>
      <HeroSection />
      <Box sx={{ margin: '20px 0px' }}>
        <Typography textAlign='center' sx={{ fontFamily: 'Russo One', color: isDarkMode && "white" }} variant='h4'>{profileName}'s movies</Typography>
        <Container maxWidth='md'>
        <MovieContainer setMovies={setMovies} movies={movies} currentUser={currentUser} readOnly={readOnly} />
        </Container>
      </Box>
    </>
  )
}

export default UserPage