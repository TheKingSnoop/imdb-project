import React, { useState } from 'react';
import { Typography, Box, Card, CardContent, CardActions, Button, CardMedia, Stack, Rating, Tooltip, Snackbar } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addToSeenIt, dynamicRating, formatDate } from '../../service/movieCardService'
import './movieCard.css'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import DialogComponent from '../dialog/Dialog';

const MovieCard = (props) => {
  //console.log("loooook",props.movieDescription)
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('jwt')

  const releaseYear = props.release_date.slice(0, 4);
  const colourRating = dynamicRating(props);
  const ukDateFormat = formatDate(props.dateWatched);

  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    
    console.log("just clicked Seen It")
    const movieToAdd = addToSeenIt(props)
    const addToMovieDatabase = async () => {
      const response = await fetch(`http://${props.API_HOST}:${props.API_PORT}/movie/addMovie`, {
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
      } else {setOpen(true)}
    }
    addToMovieDatabase()
  }

  const handleDelete = () => {
    console.log(props.movies)
    const movie_Id = props.movies[props.index]._id
    const review_Id = props.movies[props.index].userReviewId[0]._id
    console.log('movie_Id', movie_Id)
    console.log('review_Id', review_Id)

    const deleteMovieFromDatabase = async () => {
      const response = await fetch(`http://${props.API_HOST}:${props.API_PORT}/movie/my-movies/delete/${movie_Id}/${review_Id}`, {
        method: 'DELETE',
        headers: { "Authorization": "Bearer " + token.token, "Content-Type": "application/json" }
      })
      const data = await response.json()
      console.log('has the movie been deleted?', data)
      navigate(0);
    }
    deleteMovieFromDatabase()
  }

  return (

    <Box width='200' sx={{margin:'10px'}}>
      <Card sx={{ minHeight: "500px", maxHeight: 'auto', minWidth: '190px', bgcolor: "primary.light" , color:'white'}}>
        <Tooltip title={props.title}><Box sx={{ position: 'relative' }}>
          <CardMedia component='img' width='100%' image={props.image} sx={{ objectFit: 'contain', maxWidth: '100%' }} />
          {props.isFavourite && <FavoriteIcon sx={{ position: 'absolute', top: '5px', right: '5px', fontSize: '40px', color: 'primary.light' }} />}
        </Box></Tooltip>
        <CardContent sx={{ paddingBottom: '0px' }}>
          {/* <Typography variant='h6' gutterBottom sx={{ height: "30px", overflow: "hidden" }}>{props.title}</Typography> */}
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
              <Button onClick={handleSubmit} size='medium' color='secondary' sx={{
                bgcolor: "primary.main", '&:hover': {
                  backgroundColor: 'primary.dark'
                }
              }}>Seen It?
              </Button>
              <Snackbar 
                message='Added to My Movies' 
                autoHideDuration={2000}
                open={open}
                onClose={() => setOpen(false)}
                anchorOrigin={{
                  vertical:'bottom',
                  horizontal:'center'
                }}/>
            </CardActions>}
          {/* myMovies page and signed in */}
          {props.movies[props.index]._id &&
            <Box>
              <CardContent>
                
                <Rating sx={{paddingTop: '15px', width:'100%', borderTop:'2px solid #c62828', paddingBottom:'15px'}} value={props.user_rating} precision={0.5} size='large' readOnly />
                <Box sx={{paddingBottom:'10px'}}>
                <Typography sx={{ display: "flex", flexDirection: "column", overflowX: "hidden", height: "80px"}} variant='body2'>{props.user_analysis}</Typography>
                </Box>
                <Stack direction='row' spacing={1}>
                <Typography variant='body2'>Seen on:</Typography>
                <Typography variant='body2'>{ukDateFormat}</Typography>
                </Stack>
              </CardContent>
              <Stack direction="row" spacing={1}>
                {!props.readOnly && <CardActions sx={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                  <DialogComponent API_HOST={props.API_HOST} API_PORT={props.API_PORT} name={'REMOVE'} dialogText={`Are you sure you want to remove '${props.movies[props.index].title}' from your list of Seen It movies?`} handleSubmit={handleDelete} dialogTitle={'Remove Movie'} />
                  <DialogComponent name={'REVIEW'} form={true} movies={props.movies} index={props.index} />
                </CardActions>}
              </Stack>
            </Box>}
        </> :
          // not signed in
          ""}
      </Card>
    </Box>
  )
}

export default MovieCard;