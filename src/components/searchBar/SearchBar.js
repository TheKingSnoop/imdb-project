import { TextField, Box, Button, Stack, Grid } from '@mui/material'
import React, { useState } from 'react'

const SearchBar = ({ API_HOST, setMovies, isDarkMode, getTop20Movies, setLandingPageText }) => {
  const [userInput, setUserInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const getMovie = async () => {
      const response = await fetch(`http://${API_HOST}/tmdb/${userInput}`)
      const data = await response.json();
      setMovies(data.payload)
    }
    getMovie();
    if(userInput === '') {
      setLandingPageText('Top 20 trending movies')
    } else {
      setLandingPageText(`Showing results for "${userInput}"`)
    }
  }
  
  const handleClickViewAll = () => {
    getTop20Movies();
    setLandingPageText('Top 20 trending movies')
  }

  return (
    <Box sx={{ margin:"auto", maxWidth: "1240px", padding: '30px 30px 0px 30px', marginBottom:{sm: '20px'}}}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item md={6} sm={8} xs={7}>
            <TextField fullWidth color={isDarkMode? 'secondary':'primary'} size='medium' sx={{"& .MuiInputBase-root": {height: {xs:'40px', sm:'100%'}, color: isDarkMode ? 'white' : 'primary'}}} placeholder='Star Wars' label="Search movie" variant='outlined' focused onChange={(e) => { setUserInput(e.target.value) }} />
          </Grid>
          <Grid item md={3} sm={2} xs={5}><Button variant='contained' fullWidth sx={{ height: '100%', backgroundColor: 'primary.light' }} type="submit">Search</Button>
          </Grid>
          <Grid item md={3} sm={2} xs={12}><Button variant='contained' fullWidth sx={{height: {sm:'100%', xs:'auto'} ,backgroundColor: 'primary.light' }} onClick={handleClickViewAll}>View trending movies</Button>
          </Grid>

        </Grid>
      </form>
    </Box>
  )
}

export default SearchBar