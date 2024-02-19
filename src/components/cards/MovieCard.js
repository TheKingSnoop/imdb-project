import React, { useState } from 'react';
import { Typography, Box, Card, CardContent, CardActions, Button, CardMedia, Stack, Rating, Tooltip, Snackbar } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { addToSeenIt, dynamicRating, formatDate } from '../../service/movieCardService'
import './movieCard.css'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

const MovieCard = (props) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('jwt')

  const releaseYear = props.release_date.slice(0, 4);
  const colourRating = dynamicRating(props);
  const ukDateFormat = formatDate(props.dateWatched);

  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    const movieToAdd = addToSeenIt(props)
    const addToMovieDatabase = async () => {
      const response = await fetch(`http://${props.API_HOST}/movie/addMovie`, {
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
      } else { setOpen(true) }
    }
    addToMovieDatabase()
  }

  const snackBarHandleClick = () => {
    navigate('/myMovies')
    setTimeout(() => { window.scrollTo(0, document.body.scrollHeight); }, 500)
  }

  return (

    <Box width='200' sx={{ margin: '10px' }}>
      <Card sx={{ minHeight: "400px", maxHeight: 'auto', minWidth: '120px', bgcolor: "primary.light", color: 'white' }}>
        <Tooltip title={props.title}>
          <CardMedia component='img' width='100%' image={props.image} sx={{ objectFit: 'contain', maxWidth: '100%' }} />
        </Tooltip>
        <CardContent sx={{ paddingBottom: '0px' }}>
          {props.movieDescription ? <Typography variant='body2' sx={{ display: "flex", flexDirection: "column", overflowX: "hidden", height: "90px" }}>{props.description}</Typography> : null}
          <Stack direction="row" spacing={1}>
            <div className='rating'>
              <StarOutlineIcon sx={{ color: colourRating }} />
              <Typography variant='body2' sx={{ color: colourRating }}>{Math.round(props.rating * 10) / 10}</Typography>
            </div>
          </Stack>
          <Typography variant='body2'>{releaseYear}</Typography>
        </CardContent>
        {props.currentUser ? <>
          {/* signed in and home page */}
          {!props.movies[props.index]._id &&
            <CardActions>
              <Tooltip title='Add to my movies seen'>
                <Button onClick={handleSubmit} size='medium' color='secondary' sx={{
                  bgcolor: "primary.main", '&:hover': {
                    backgroundColor: 'primary.dark'
                  }
                }}>Seen It?
                </Button>
              </Tooltip>
              <Snackbar
                autoHideDuration={3000}
                open={open}
                onClose={() => setOpen(false)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }} >
                <Box bgcolor="dimGrey" paddingX='10px' height='40px' sx={{display:'flex', alignItems:'center', borderRadius:'5px' ,'&:hover': { cursor: 'pointer' }}}>
                <DoneOutlineIcon sx={{ color:'limeGreen', marginRight:'7px'}}/>
                  <h5 color='White' onClick={snackBarHandleClick}>Added to My Movies. Click here to review now.</h5>
                </Box>

              </Snackbar>
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