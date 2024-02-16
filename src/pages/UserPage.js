import { Typography, Box, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import HeroSection from '../components/heroSection/HeroSection'
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import MyMoviesMovieContainer from '../components/movieContainer/MyMoviesMovieContainer.js';
import { useNavigate } from 'react-router-dom';
import SearchFilter from '../components/searchFilter/SearchFilter';

const UserPage = ({ API_HOST, movies, setMovies, currentUser, isDarkMode }) => {
  const [filterUserInput, setFilterUserInput] = useState("");
  const [isFavourite, setIsFavourite] = useState("all");
  const [profileName, setProfileName] = useState("")

  const cookies = new Cookies();
  const navigate = useNavigate();
  const params = useParams();
  const token = cookies.get('jwt')
  const userPageId = params.userId;

  const favouriteSelector = (filterValue) => {
    setIsFavourite(filterValue)
  };

  let filteredFavMovieList = movies.filter(movie => {
    if (isFavourite === "true") {
      return movie.userReviewId[0].isFavourite === true
    } else if (isFavourite === "false") {
      return movie.userReviewId[0].isFavourite === false
    } else {
      return movie;
    }
  })

  const getMyMovies = async () => {
    if (!token) {
      alert("You must be signed in to view a user's page")
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
      setFilterUserInput("")
      setIsFavourite("all")
    }
  };

  async function getUserById() {
    if (!token) {
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
      <Box maxWidth='1240px' sx={{ margin: '20px 0px' }}>
        <Typography textAlign='center' sx={{ fontFamily: 'Russo One', color: isDarkMode && "white" }} variant='h4'> {profileName.endsWith('s') ? profileName + "'" : profileName + "'s"} movies</Typography>
        <Box>
          <SearchFilter API_HOST={API_HOST} favouriteSelector={favouriteSelector} getMyMovies={getMyMovies} filterUserInput={filterUserInput} setFilterUserInput={setFilterUserInput} setMovies={setMovies} user_Id={userPageId} setIsFavourite={setIsFavourite} isFavourite={isFavourite} isDarkMode={isDarkMode} />
          <Box marginY='15px' sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Stack onClick={() => setIsFavourite("all")} sx={{ display: 'flex', alignItems: 'center', '&:hover': { cursor: 'pointer' } }}>
              <Typography color={isDarkMode && 'white'} sx={{ fontFamily: 'Russo One' }}>{movies.length}</Typography>
              <Typography color='dimgrey' variant='body2'>Movies</Typography>
            </Stack>
            <Stack onClick={() => setIsFavourite("true")} sx={{ display: 'flex', alignItems: 'center', '&:hover': { cursor: 'pointer' } }}>
              {movies[0] && movies[0].userReviewId && <Typography color={isDarkMode && 'white'} sx={{ fontFamily: 'Russo One' }}>{movies.filter(movie => movie.userReviewId[0].isFavourite === true).length}</Typography>}
              <Typography color='dimGrey' variant='body2'>Favourited</Typography>
            </Stack>
          </Box>
          <MyMoviesMovieContainer setMovies={setMovies} movies={filteredFavMovieList} currentUser={currentUser} isDarkMode={isDarkMode} />
        </Box>
      </Box>
    </>
  )
}

export default UserPage