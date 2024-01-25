import React from 'react'
import { TextField, Box, MenuItem } from '@mui/material'

const FavButton = ({favouriteSelector, isFavourite, isDarkMode}) => {
    const handleFavouriteValue = (e) => {
        favouriteSelector(e.target.value)
    }
    const darkModeInputColour = 
    {color: '#fff'}
  return (
    <Box width='125px'>
        <TextField label='Filter By'
        select
        value= {isFavourite}
        onChange={handleFavouriteValue}
        fullWidth
        color={isDarkMode? 'secondary': 'primary'}
        sx={{input: isDarkMode ? darkModeInputColour: "" }}
        >
            <MenuItem value='all'>All</MenuItem>
            <MenuItem value='true'>Favourites</MenuItem>
            <MenuItem value='false'>Not Favourites</MenuItem>
        </TextField>
    </Box>
  )
}

export default FavButton