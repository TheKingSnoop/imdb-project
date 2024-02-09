import React from 'react'
import { TextField, Box, MenuItem } from '@mui/material'

const FavButton = ({ favouriteSelector, isFavourite, isDarkMode }) => {
  const handleFavouriteValue = (e) => {
    favouriteSelector(e.target.value)
  }
  const darkModeInputColour =
    { color: '#fff' }
  return (
    <TextField label='Filter By'
      focused
      select
      fullWidth
      value={isFavourite}
      onChange={handleFavouriteValue}
      color={isDarkMode ? 'secondary' : 'primary'}
      sx={{ input: isDarkMode ? darkModeInputColour : "" }}>
      <MenuItem value='all'>All</MenuItem>
      <MenuItem value='true'>Favourites</MenuItem>
      <MenuItem value='false'>Not Favourites</MenuItem>
    </TextField>

  )
}

export default FavButton