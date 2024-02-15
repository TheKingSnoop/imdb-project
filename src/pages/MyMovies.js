import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";
import MyMoviesMovieContainer from '../components/movieContainer/MyMoviesMovieContainer';
import SearchFilter from '../components/searchFilter/SearchFilter';
import { Typography, Container, Stack, Box } from '@mui/material';
import HeroSection from '../components/heroSection/HeroSection';
import { useNavigate } from 'react-router-dom';

const MyMovies = ({ API_HOST,movies, setMovies, currentUser, movieDescription, isDarkMode }) => {
  const [filterUserInput, setFilterUserInput] = useState("");
  const [isFavourite, setIsFavourite] = useState("all");
  
  const cookies = new Cookies()
  const token = cookies.get('jwt')
        const user = { name: jwtDecode(token.token).username, id: jwtDecode(token.token).userId }
        const user_Id = user.id

  const navigate = useNavigate();

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
    const token = cookies.get('jwt')
    const user = { name: jwtDecode(token.token).username, id: jwtDecode(token.token).userId }
    const user_Id = user.id
    const response = await fetch(`http://${API_HOST}/movie/my-movies`, {
      method: "POST",
      headers: { "Authorization": "Bearer " + token.token, "Content-Type": "application/json" },
      body: JSON.stringify({ user_Id: user_Id })
    });
    const data = await response.json();

    if (data && data.error && data.error.message === "Unauthorized") {
      alert('Session expired, please login again.')
      navigate('/login')
    } else {
      setMovies(data)
      setFilterUserInput("")
      setIsFavourite("all")
    }
  };

useEffect(() => {
    getMyMovies();
  }, [])
  return (<>
    <HeroSection />
    <Container maxWidth='1240px' sx={{ py: 6, padding: '0px' }}>
      <SearchFilter API_HOST={API_HOST} filterUserInput={filterUserInput} setFilterUserInput={setFilterUserInput}
        getMyMovies={getMyMovies} setMovies={setMovies} isDarkMode={isDarkMode} setIsFavourite={setIsFavourite} isFavourite={isFavourite} favouriteSelector={favouriteSelector} user_Id={user_Id}/>
        <Box marginY='15px' sx={{display:'flex', justifyContent:'space-around'}}>
          <Stack onClick={()=> setIsFavourite("all")}  sx={{display:'flex', alignItems:'center', '&:hover': { cursor: 'pointer' }}}>
          <Typography color={isDarkMode && 'white'} sx={{fontFamily:'Russo One'}}>{movies.length}</Typography>
          <Typography color='dimgrey' variant='body2'>Movies</Typography>
          </Stack>
          <Stack onClick={()=> setIsFavourite("true")} sx={{display:'flex', alignItems:'center', '&:hover': { cursor: 'pointer' }}}>
          {movies[0] && movies[0].userReviewId && <Typography  color={isDarkMode && 'white'} sx={{fontFamily:'Russo One'}}>{movies.filter(movie => movie.userReviewId[0].isFavourite === true).length}</Typography>}
          <Typography color='dimGrey' variant='body2'>Favourited</Typography>
          </Stack>
        </Box>
      <Container sx={{ padding: '0px' }}>
        {movies.length ? <MyMoviesMovieContainer API_HOST={API_HOST} setMovies={setMovies} movies={filteredFavMovieList} currentUser={currentUser} filterUserInput={filterUserInput} movieDescription={movieDescription} /> : <Typography>You haven't added any movies. You can add movies in the home page or no movie title matched the filter request.</Typography>}
      </Container>
    </Container>
  </>)
}

export default MyMovies