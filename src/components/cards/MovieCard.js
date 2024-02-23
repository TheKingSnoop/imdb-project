import React, { useState } from 'react';
import { Typography, Box, Card, CardContent, CardActions, Button, CardMedia, Stack, Rating, Tooltip, Snackbar } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { addToSeenIt, dynamicRating, formatDate } from '../../service/movieCardService'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import SnackBarComponent from '../snackBar/SnackBarComponent';

const MovieCard = (props) => {
  const cookies = new Cookies();
  const token = cookies.get('jwt')

  const releaseYear = props.release_date.slice(0, 4);
  const colourRating = dynamicRating(props);
  // const ukDateFormat = formatDate(props.dateWatched);

  const [openSeenItSnackBar, setOpenSeenItSnackBar] = useState(false)
  const [openWatchListSnackBar, setOpenWatchListSnackBar] = useState(false)

  const handleSubmit = (endpoint, setFunction) => {
    const movieToAdd = addToSeenIt(props)
    const addToMovieDatabase = async () => {
      const response = await fetch(`http://${props.API_HOST}/${endpoint}`, {
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
        <Tooltip title={props.title}>
          <CardMedia component='img' width='100%' image={props.image} sx={{ objectFit: 'contain', maxWidth: '100%' }} />
        </Tooltip>
        <CardContent sx={{ paddingBottom: '0px' }}>
          <Typography variant='body2' sx={{ display: "flex", flexDirection: "column", overflowX: "hidden", height: "90px" }}>{props.description}</Typography> 
          <Stack direction="row" spacing={1}>
            <Box sx={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-start', gap: '10px',  padding: '10px 0'}}>
              <StarOutlineIcon sx={{ color: colourRating }} />
              <Typography variant='body2' sx={{ color: colourRating }}>{Math.round(props.rating * 10) / 10}</Typography>
            </Box>
          </Stack>
          <Typography variant='body2'>{releaseYear}</Typography>
        </CardContent>
        {props.currentUser ? <>
          {/* signed in and home page */}
          {!props.movies[props.index]._id &&
            <CardActions>
              <Tooltip title='Add to my movies seen'>
                <Button onClick={()=> handleSubmit("movie/addMovie", setOpenSeenItSnackBar)} size='medium' color='secondary' sx={{
                  bgcolor: "primary.main", '&:hover': {
                    backgroundColor: 'primary.dark'
                  }
                }}>+ Seen It
                </Button>
              </Tooltip>

              <Tooltip title='Add to your watch list'>
                <Button onClick={()=> handleSubmit("watchlist/addMovie", setOpenWatchListSnackBar)} size='medium' color='secondary' sx={{
                  bgcolor: "primary.main", '&:hover': {
                    backgroundColor: 'primary.dark'
                  }
                }}>+ watch list
                </Button>
              </Tooltip>
              <SnackBarComponent setOpen={setOpenWatchListSnackBar} open={openWatchListSnackBar}  message={'Added to My Watch List. Click here to view watch list.'} path={"/mywatchlist"}/>
              <SnackBarComponent setOpen={setOpenSeenItSnackBar} open={openSeenItSnackBar} message={'Added to My Movies. Click here to review now.'} path={"/myMovies"}/>
            </CardActions>}
          {/* myMovies page and signed in */}
        </> :
          // not signed in
          ""}
      </Card>
    </Box>
  )
}

export default MovieCard;