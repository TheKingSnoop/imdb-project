import React, { useState } from 'react';
import { Typography, Box, Card, CardContent, CardActions, Button, CardMedia, Stack, Rating, Tooltip, Snackbar } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { addToSeenIt, dynamicRating, formatDate } from '../../service/movieCardService'
import Cookies from 'universal-cookie'

const MovieCard = ({movie, API_HOST, currentUser, setOpenSeenItSnackBar, setOpenWatchListSnackBar}) => {
  const cookies = new Cookies();
  const token = cookies.get('jwt')

  const releaseYear = movie.release_date.slice(0, 4);
  const colourRating = dynamicRating(movie);

  const handleSubmit = (endpoint, setFunction) => {
    const movieToAdd = addToSeenIt(movie, currentUser)
    const addToMovieDatabase = async () => {
      const response = await fetch(`http://${API_HOST}/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(movieToAdd),
        headers: {
          "Authorization": "Bearer " + token.token,
          "Content-Type": "application/json"
        }
      })
      const data = await response.json()
      if (data.errors) {
        alert(data.errors[0].msg)
      } else { setFunction(true) }
    }
    addToMovieDatabase()
  }

  return (

    <Box width='200' sx={{ margin: '10px' }}>
      <Card sx={{ minHeight: "400px", maxHeight: 'auto', minWidth: '120px', bgcolor: "primary.light", color: 'white' }}>
        <Tooltip title={movie.title}>
          <CardMedia component='img' width='100%' image={movie.image} sx={{ objectFit: 'contain', maxWidth: '100%' }} />
        </Tooltip>
        <CardContent sx={{ paddingBottom: '0px' }}>
          <Typography variant='body2' sx={{ display: "flex", flexDirection: "column", overflowX: "hidden", height: "90px" }}>{movie.description}</Typography> 
          <Stack direction="row" spacing={1} sx={{display:'flex', alignItems:'center'}}>
            <Box sx={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-start', gap: '10px',  padding: '5px 0'}}>
              <StarOutlineIcon sx={{ color: colourRating }} />
              <Typography variant='body2' sx={{ color: colourRating }}>{Math.round(movie.rating * 10) / 10}</Typography>
            </Box>
              <Typography variant='body2'>{releaseYear}</Typography>
          </Stack>
          
        </CardContent>
        {/* signed in and home page */}
        {currentUser && 
            <CardActions sx={{paddingTop:'0px', display:'flex', justifyContent:'center'}}>
              <Tooltip title='Add to my movies seen'>
                <Button onClick={()=> handleSubmit("movie/addMovie", setOpenSeenItSnackBar)} size='medium' color='secondary' sx={{
                  bgcolor: "primary.main", '&:hover': {
                    backgroundColor: 'primary.dark'
                  }
                }}>+ Seen It
                </Button>
              </Tooltip>

              <Tooltip title='Add to your watchlist'>
                <Button onClick={()=> handleSubmit("watchlist/addMovie", setOpenWatchListSnackBar)} size='medium' color='secondary' sx={{
                  bgcolor: "primary.main", '&:hover': {
                    backgroundColor: 'primary.dark'
                  }
                }}>+ Watchlist
                </Button>
              </Tooltip>
             </CardActions>
          }
      </Card>
    </Box>
  )
}

export default MovieCard;