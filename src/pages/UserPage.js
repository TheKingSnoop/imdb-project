import { Typography, Box, Container, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import HeroSection from '../components/heroSection/HeroSection'
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import MyMoviesMovieContainer from '../components/movieContainer/MyMoviesMovieContainer.js';
import { useNavigate } from 'react-router-dom';

const UserPage = ({ API_HOST, movies, setMovies, currentUser, isDarkMode }) => {

  const [profileName, setProfileName] = useState("")

  const cookies = new Cookies();
  const navigate = useNavigate();
  const params = useParams();
  const token = cookies.get('jwt')
  const readOnly = true;
  const userPageId = params.userId;

  const getMyMovies = async () => {
    if(!token) {
      alert('not signed in')
      navigate('/users') 
      return
    }
      const response = await fetch(`http://${API_HOST}/movie/my-movies`, {
      method: "POST",
      headers: { "Authorization": "Bearer " + token.token, "Content-Type": "application/json" },
      body: JSON.stringify({ user_Id: userPageId })
    });
    const data = await response.json()
    if (data && data.error && data.error.message === "Unauthorized") {
      alert('Session expired, please login again.')
      navigate('/login')
    } else {
      setMovies(data)
    }
    
  };

  async function getUserById() {
    if(!token) {
      return
    }
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
      <Box maxWidth='1240px' sx={{ margin: '20px 0px'}}>
        <Typography textAlign='center' sx={{ fontFamily: 'Russo One', color: isDarkMode && "white" }} variant='h4'> {profileName.endsWith('s') ? profileName + "'": profileName + "'s"} movies</Typography>
        <Container>
        <Box marginY='15px' sx={{display:'flex', justifyContent:'space-around'}}>
          <Stack sx={{display:'flex', alignItems:'center'}}>
          <Typography  color={isDarkMode && 'white'} sx={{fontFamily:'Russo One'}}>{movies.length}</Typography>
          <Typography color='dimgrey' variant='body2'>Movies</Typography>
          </Stack>
          <Stack sx={{display:'flex', alignItems:'center'}}>
          {movies[0] && movies[0].userReviewId && <Typography  color={isDarkMode && 'white'} sx={{fontFamily:'Russo One'}}>{movies.filter(movie => movie.userReviewId[0].isFavourite === true).length}</Typography>}
          <Typography color='dimGrey' variant='body2'>Favourited</Typography>
          </Stack>
        </Box>
        <MyMoviesMovieContainer setMovies={setMovies} movies={movies} currentUser={currentUser} isDarkMode={isDarkMode} />
        </Container>
      </Box>
    </>
  )
}

export default UserPage