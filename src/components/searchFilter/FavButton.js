import React from 'react'
import { TextField, Box, MenuItem } from '@mui/material'

const FavButton = ({ favouriteSelector, isFavourite, isDarkMode }) => {
  const handleFavouriteValue = (e) => {
    favouriteSelector(e.target.value)
  }
  return (
    <TextField label='Filter By'
      focused
      select
      fullWidth
      value={isFavourite}
      onChange={handleFavouriteValue}
      color={isDarkMode ? 'secondary' : 'primary'}
      sx={{ input: isDarkMode ? 'white' : "", "& .MuiInputBase-root": {height: {xs:'40px', sm:'100%'}, color: isDarkMode ? 'white' : 'primary'} }}>
      <MenuItem value='all'>All</MenuItem>
      <MenuItem value='true'>Favourites</MenuItem>
      <MenuItem value='false'>Not Favourites</MenuItem>
    </TextField>

  )
}

export default FavButton