import { TextField } from '@mui/material'
import React, {useState} from 'react'
import './searchBar.css'

const SearchBar = ({movies, setMovies}) => {
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
    <><div className='search_container'>
    <form className='search_input' onSubmit={handleSubmit}>
        <TextField fullWidth label="Search movie" variant='outlined' onChange={(e) => {setUserInput(e.target.value)}}/>
        </form></div>
    </>
  )
}

export default SearchBar