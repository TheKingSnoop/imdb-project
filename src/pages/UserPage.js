import { Typography, Box, Stack, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import HeroSection from '../components/heroSection/HeroSection'
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import MyMoviesMovieContainer from '../components/movieContainer/MyMoviesMovieContainer.js';
import CarouselComponent from '../components/carousel/CarouselComponent.js';
import { useNavigate } from 'react-router-dom';
import SearchFilter from '../components/searchFilter/SearchFilter';

const UserPage = ({ API_HOST, movies, setMovies, currentUser, isDarkMode }) => {
  const [filterUserInput, setFilterUserInput] = useState("");
  const [isFavourite, setIsFavourite] = useState("all");
  const [profileName, setProfileName] = useState("")
  const [watchlistMovies, setWatchlistMovies] = useState([]);

  const cookies = new Cookies();
  const navigate = useNavigate();
  const params = useParams();
  const token = cookies.get('jwt')
  const readOnly = true;
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
      cookies.remove('jwt');
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

  const getWatchList = async () => {
    if (!token) {
      return
    }
    try{
    const response = await fetch(`http://${API_HOST}/watchlist/getWatchList/${userPageId}`)
    const data = await response.json()
    setWatchlistMovies(data)
    } catch(error){
      console.log(error)
    }
}

  useEffect(() => {
    getMyMovies();
    getUserById();
    getWatchList()
  }, []);

  return (
    <>
      <HeroSection />
      <Box maxWidth='1240px'  sx={{ margin: '20px 0px' }}>
        <Typography gutterBottom textAlign='center' sx={{ fontFamily: 'Russo One', color: isDarkMode && "white", fontSize:{xs:'26px', sm:'30px'} }} variant='h4'> {profileName.endsWith('s') ? profileName + "'" : profileName + "'s"} Movies</Typography>
        <Typography variant='h5' marginLeft='24px' sx={{ fontFamily: 'Russo One', color: isDarkMode && "white", fontSize:{xs:'20px', sm:'24px'} }}>Watchlist</Typography>
        <CarouselComponent watchlistMovies={watchlistMovies} isDarkMode={isDarkMode}/>
        <Box>
        <Typography variant='h5' marginLeft='24px' sx={{ fontFamily: 'Russo One', color: isDarkMode && "white", fontSize:{xs:'20px', sm:'24px'} }}>Seen</Typography>
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
          <Container sx={{ padding: '0px' }}>
            <MyMoviesMovieContainer readOnly={readOnly} setMovies={setMovies} movies={filteredFavMovieList} currentUser={currentUser} isDarkMode={isDarkMode} />
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default UserPage