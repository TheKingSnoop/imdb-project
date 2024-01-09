import { TextField } from '@mui/material'
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
    <>
    <form onSubmit={handleSubmit}>
    <TextField color={isDarkMode? 'secondary': 'primary'} sx={{ maxWidth: {md: "900px", xs: '320px'}, input: isDarkMode ? darkModeInputColour: lightModeInputColour, minWidth: "300px", marginBottom: '30px'}} fullWidth label="Search movie" variant='outlined' focused onChange={(e) => {setUserInput(e.target.value)}}/>
        </form>
    </>
  )
}

export default SearchBar