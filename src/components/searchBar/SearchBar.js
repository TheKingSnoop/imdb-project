import { TextField, Box, Button, Stack } from '@mui/material'
import React, {useState} from 'react'

const SearchBar = ({setMovies, isDarkMode}) => {
    const [userInput, setUserInput] = useState("");

    const darkModeInputColour = 
      {color: '#fff'}

      const lightModeInputColour = 
      {color: '#0a0a0a'}

    function handleSubmit (e) {
        e.preventDefault();

        const getMovie = async() => {
            const response = await fetch(`http://localhost:3001/tmdb/${userInput}`)
            const data = await response.json();
            console.log('searchbox',data)
            setMovies(data.payload)
        }
        getMovie()
    }
  return (
    <Box sx={{display: 'flex', justifyContent:'center', margin:'20px 0px'}}>
    <form onSubmit={handleSubmit}>
      <Stack direction='row' spacing={1} sx={{height:'55px'}} >
        <TextField color={isDarkMode? 'secondary': 'primary'} sx={{ maxWidth: {md: "400px", xs: '200px'}, input: isDarkMode ? darkModeInputColour: lightModeInputColour, minWidth: {xs: "200px", md:"300px"}, marginBottom: '30px'}} fullWidth label="Search movie" variant='outlined' focused onChange={(e) => {setUserInput(e.target.value)}}/>
        <Button variant='contained' sx={{ backgroundColor: 'primary.light'}} type="submit">Search</Button>
      </Stack>
    </form>
    </Box>
  )
}

export default SearchBar