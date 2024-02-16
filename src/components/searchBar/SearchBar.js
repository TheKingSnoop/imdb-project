import { TextField, Box, Button, Stack, Grid } from '@mui/material'
import React, { useState } from 'react'

const SearchBar = ({ API_HOST, setMovies, isDarkMode, getTop20Movies }) => {
  const [userInput, setUserInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const getMovie = async () => {
      const response = await fetch(`http://${API_HOST}/tmdb/${userInput}`)
      const data = await response.json();
      setMovies(data.payload)
    }
    getMovie()
  }
  return (
    <Box sx={{ margin:"auto", maxWidth: "1240px", padding: '30px 30px 0px 30px', marginBottom:{sm: '20px'}}}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item md={6} sm={8} xs={7}>
            <TextField color={isDarkMode ? 'secondary' : 'primary'} fullWidth sx={{"& .MuiInputBase-root": {height: {xs:'40px', sm:'100%'}}, input: isDarkMode ? 'white' : '#0a0a0a' }} label="Search movie" variant='outlined' focused onChange={(e) => { setUserInput(e.target.value) }} />
          </Grid>
          <Grid item md={3} sm={2} xs={5}><Button variant='contained' fullWidth sx={{ height: '100%', backgroundColor: 'primary.light' }} type="submit">Search</Button>
          </Grid>
          <Grid item md={3} sm={2} xs={12}><Button variant='contained' fullWidth sx={{height: {sm:'100%', xs:'auto'} ,backgroundColor: 'primary.light' }} onClick={() => getTop20Movies()}>View All</Button>
          </Grid>

        </Grid>
      </form>
    </Box>
  )
}

export default SearchBar