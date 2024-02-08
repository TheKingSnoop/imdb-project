import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";
import MovieContainer from '../components/movieContainer/MovieContainer';
import SearchFilter from '../components/searchFilter/SearchFilter';
import { Typography, Container } from '@mui/material';
import HeroSection from '../components/heroSection/HeroSection';
import { useNavigate } from 'react-router-dom';

const MyMovies = ({ API_HOST, movies, setMovies, currentUser, movieDescription, isDarkMode }) => {
  const [filterUserInput, setFilterUserInput] = useState("");
  const [isFavourite, setIsFavourite] = useState("all");

  const navigate = useNavigate();

  const favouriteSelector = (filterValue) => {
    setIsFavourite(filterValue)
    console.log(filterValue)
  };

  let filteredFavMovieList = movies.filter(movies => {
    if (isFavourite === "true") {
      return movies.userReviewId[0].isFavourite === true
    } else if (isFavourite === "false") {
      return movies.userReviewId[0].isFavourite === false
    } else {
      return movies;
    }
  })

  movieDescription=false;
  const cookies = new Cookies()
  useEffect(() => {
    getMyMovies();
  }, [])

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

  return (<>
    <HeroSection />
    <Container maxWidth='md' sx={{ py: 6, padding: '0px' }}>
      <SearchFilter API_HOST={API_HOST} filterUserInput={filterUserInput} setFilterUserInput={setFilterUserInput}
        getMyMovies={getMyMovies} movies={movies} setMovies={setMovies} isDarkMode={isDarkMode} setIsFavourite={setIsFavourite} isFavourite={isFavourite} favouriteSelector={favouriteSelector} />
      <Container maxWidth='md'>
        {movies.length ? <MovieContainer API_HOST={API_HOST} setMovies={setMovies} movies={filteredFavMovieList} currentUser={currentUser} filterUserInput={filterUserInput} movieDescription={movieDescription} /> : <Typography>You haven't added any movies. You can add movies in the home page or no movie title matched the filter request.</Typography>}
      </Container>
    </Container>
  </>)
}

export default MyMovies