import { TextField } from '@mui/material'
import React, {useState} from 'react'

const SearchBar = ({setMovies}) => {
    const [userInput, setUserInput] = useState("");

    function handleSubmit (e) {
        e.preventDefault();

        const getMovie = async() => {
            const response = await fetch(`http://localhost:3001/tmdb/${userInput}`)
            const data = await response.json();
            setMovies(data.payload)
        }
        getMovie()
    }
  return (
    <>
    <form onSubmit={handleSubmit}>
        <TextField sx={{ maxWidth: {md: "900px", xs: '320px'}, minWidth: "300px", paddingBottom: '30px'}} fullWidth label="Search movie" variant='outlined' onChange={(e) => {setUserInput(e.target.value)}}/>
        </form>
    </>
  )
}

export default SearchBar