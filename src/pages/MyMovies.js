import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";
import MovieContainer from '../components/movieContainer/MovieContainer';
import SearchFilter from '../components/searchFilter/SearchFilter';
import { Typography, Container } from '@mui/material';
import HeroSection from '../components/heroSection/HeroSection';
import { useNavigate } from 'react-router-dom';

const MyMovies = ({ movies, setMovies, currentUser, movieDescription, setMovieDescription, isDarkMode }) => {
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

  setMovieDescription(false)
  const cookies = new Cookies()
  useEffect(() => {
    getMyMovies();
  }, [])

  const getMyMovies = async () => {
    const token = cookies.get('jwt')
    const user = { name: jwtDecode(token.token).username, id: jwtDecode(token.token).userId }
    const user_Id = user.id
    const response = await fetch("http://localhost:3001/movie/my-movies", {
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
      <SearchFilter filterUserInput={filterUserInput} setFilterUserInput={setFilterUserInput}
        getMyMovies={getMyMovies} movies={movies} setMovies={setMovies} isDarkMode={isDarkMode} setIsFavourite={setIsFavourite} isFavourite={isFavourite} favouriteSelector={favouriteSelector} />
      <Container maxWidth='md'>
        {movies.length ? <MovieContainer setMovies={setMovies} movies={filteredFavMovieList} currentUser={currentUser} filterUserInput={filterUserInput} movieDescription={movieDescription} /> : <Typography>You haven't added any movies. You can add movies in the home page.</Typography>}
      </Container>
    </Container>
  </>)
}

export default MyMovies