import { TextField, Button, Box, Grid } from '@mui/material'
import React from 'react'
import FavButton from './FavButton';
import { getFilteredMoviesByTitle } from '../../service/movieCardService';

const SearchFilter = ({ API_HOST, filterUserInput, setFilterUserInput, setMovies, isDarkMode, getMyMovies, isFavourite, favouriteSelector, user_Id }) => {

    const handleInputChange = (e) => {
        setFilterUserInput(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

     const data = await getFilteredMoviesByTitle(API_HOST, user_Id, filterUserInput)
     
     setMovies(data)
       
    }

    return (
        <Box sx={{ maxWidth: "1240px", margin: "auto", padding: '0px 30px', marginBottom:{sm: '20px'} }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item md={4} sm={4} xs={7}><TextField fullWidth color={isDarkMode? 'secondary':'primary'} size='medium' sx={{"& .MuiInputBase-root": {height: {xs:'40px', sm:'100%'}, color: isDarkMode ? 'white' : 'primary'}}} onChange={handleInputChange} name='title' value={filterUserInput} focused type='text' label='Search By Title' placeholder='Star Wars'></TextField>
                    </Grid>
                    <Grid item md={2} sm={2} xs={5}><Button sx={{ height: '100%' }} fullWidth variant='contained' type="submit">Search</Button>
                    </Grid>
                    <Grid item md={4} sm={4} xs={7}><FavButton isDarkMode={isDarkMode} favouriteSelector={favouriteSelector} isFavourite={isFavourite} />
                    </Grid>
                    <Grid item md={2} sm={2} xs={5}><Button sx={{ height: '100%' }} fullWidth onClick={getMyMovies} variant='contained'>Show All</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>

    )
}

export default SearchFilter