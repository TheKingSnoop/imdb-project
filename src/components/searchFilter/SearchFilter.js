import { TextField, Stack, Button, Box } from '@mui/material'
import React from 'react'
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";
import FavButton from './FavButton';

const SearchFilter = ({ filterUserInput, setFilterUserInput, setMovies, isDarkMode, getMyMovies, setIsFavourite, isFavourite, favouriteSelector}) => {

    const cookies = new Cookies();

    const darkModeInputColour = 
    {color: '#eee'}

    const handleInputChange = (e) => {
        setFilterUserInput(e.target.value)
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        const token = cookies.get('jwt')
        const user = {name: jwtDecode(token.token).username, id: jwtDecode(token.token).userId}
        const user_Id = user.id
        
        const getFilteredMoviesByTitle = async() => {
            const response = await fetch(`http://localhost:3001/movie/filterMyMovies/${user_Id}/${filterUserInput}`)
            const data = await response.json()
            console.log(data)
            setMovies(data)
        }
        getFilteredMoviesByTitle()
    }

    return (
        <Box sx={{maxWidth:'100%', height: { xs:'150px', md:'auto'}, display: 'flex',flexWrap:'wrap', justifyContent:'center', border:'solid blue 2px', padding:'20px 10px'}}>
        <form onSubmit={handleSubmit}>
            <Stack direction='row' spacing={1} sx={{height:'auto', display: 'flex', flexWrap:'wrap', justifyContent: {xs:'start', md:'center'}, alignContents: 'center', border:'2px solid green'}} >
            <TextField color={isDarkMode? 'secondary': 'primary'} sx={{ width: {xs: "200px", md:"150px"}, input: isDarkMode ? darkModeInputColour: "" }} onChange={handleInputChange} name='title' value={filterUserInput} focused type='text' label='Filter By Title'></TextField>
            <Button variant='contained' sx={{ width:'103px', backgroundColor: 'primary.light', margin:'30px'}} type="submit">Search</Button>
            <FavButton isDarkMode={isDarkMode} favouriteSelector={favouriteSelector} isFavourite={isFavourite}/>
            <Button onClick={getMyMovies} variant='contained' sx={{ backgroundColor: 'primary.light', margin:'30px', border:'solid pink 2px'}}>Show All</Button>
            </Stack>
        </form>
        </Box>

    )
}

export default SearchFilter