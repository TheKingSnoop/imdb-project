import { TextField, Stack, Button, Box, Grid } from '@mui/material'
import React from 'react'
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";
import FavButton from './FavButton';

const SearchFilter = ({ filterUserInput, setFilterUserInput, setMovies, isDarkMode, getMyMovies, setIsFavourite, isFavourite, favouriteSelector }) => {

    const cookies = new Cookies();

    const darkModeInputColour =
        { color: '#eee' }

    const handleInputChange = (e) => {
        setFilterUserInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = cookies.get('jwt')
        const user = { name: jwtDecode(token.token).username, id: jwtDecode(token.token).userId }
        const user_Id = user.id

        const getFilteredMoviesByTitle = async () => {
            const response = await fetch(`http://localhost:3001/movie/filterMyMovies/${user_Id}/${filterUserInput}`)
            const data = await response.json()
            console.log(data)
            setMovies(data)
        }
        getFilteredMoviesByTitle()
    }

    return (
        <Box sx={{padding: '30px'}}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{display:'flex', justifyContent:'center'}}>
                    <Grid item md={4} sm={4} xs={7}><TextField fullWidth color={isDarkMode ? 'secondary' : 'primary'} onChange={handleInputChange} name='title' value={filterUserInput} focused type='text' label='Filter By Title'></TextField>
                    </Grid>
                    <Grid item md={2} sm={2} xs={5}><Button sx={{height:'100%'}} fullWidth variant='contained' type="submit">Search</Button>
                    </Grid>
                    <Grid item md={4} sm={4} xs={7}><FavButton isDarkMode={isDarkMode} favouriteSelector={favouriteSelector} isFavourite={isFavourite} />
                    </Grid>
                    <Grid item md={2} sm={2} xs={5}><Button sx={{height:'100%'}} fullWidth onClick={getMyMovies} variant='contained'>Show All</Button>
                    </Grid>


                </Grid>
            </form>
        </Box>

    )
}

export default SearchFilter