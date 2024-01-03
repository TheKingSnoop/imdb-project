import React from 'react';
import { Typography, Box, Card, CardContent, CardActions, Button, CardMedia, Stack } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addToSeenIt, dynamicRating } from '../../service/movieCardService'
import './movieCard.css'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import DialogComponent from '../dialog/Dialog';

const MovieCard = (props) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('jwt')

  const releaseYear = props.release_date.slice(0, 4)
  const colourRating = dynamicRating(props)

  const handleSubmit = () => {
    const movieToAdd = addToSeenIt(props)
    const addToMovieDatabase = async () => {
      const response = await fetch('http://localhost:3001/movie/addMovie', {
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
      }
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
      const response = await fetch(`http://localhost:3001/movie/my-movies/delete/${movie_Id}/${review_Id}`, {
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

    <Box width='200'>
      <Card sx={{ minHeight: "600px", maxHeight:'auto', bgcolor: "secondary.light" }}>
        <Box sx={{position: 'relative'}}>
          <CardMedia component='img' height='320' width='200' image={props.image}/>
          {props.isFavourite && <FavoriteIcon sx={{position: 'absolute', top: '5px', right: '5px', fontSize: '40px', color: 'secondary.light'}}/>}
        </Box>
        <CardContent>
          <Typography variant='h6' gutterBottom sx={{ height: "30px", overflow: "hidden" }}>{props.title}</Typography>
          <Typography variant='body2' gutterBottom sx={{ display: "flex", flexDirection: "column", overflowX: "hidden", height: "90px" }}>{props.description}</Typography>
          <Stack direction="row" spacing={1}>
            <div className='rating'>
            <StarOutlineIcon sx={{ color: colourRating }} />
            <Typography variant='body2' sx={{ color: colourRating }}>{props.rating}</Typography>
            </div>
          </Stack>
          <Typography variant='body2'>{releaseYear}</Typography>
        </CardContent>
        {props.currentUser ? <>
          {/* signed in and home page */}
          {!props.movies[props.index]._id &&
          <CardActions>
            <Button onClick={handleSubmit} size='medium' sx={{
              color: "white", bgcolor: "secondary.main", '&:hover': {
              backgroundColor: 'primary.light'
            }
          }}>Seen It?
            </Button>
          </CardActions>}
          {/* myMovies page and signed in */}
          {props.movies[props.index]._id && 
          <Box>
            <CardContent>
            <Typography variant='h6'>My Review</Typography>
            <Typography variant='body2'>{props.user_rating}</Typography>
            <Typography variant='body2'>User analysis: {props.user_analysis}</Typography>
            <Typography variant='body2'>{props.isFavourite ? "Favourite": "Not Favourite"}</Typography>
            </CardContent>
          <Stack direction="row" spacing={1}>
            <CardActions sx={{display: 'flex', width: '100%', justifyContent: 'space-around'}}>
            <DialogComponent name={'REMOVE'} dialogText={`Are you sure you want to remove '${props.movies[props.index].title}' from your list of Seen It movies?`} handleSubmit={handleDelete} dialogTitle={'Remove Movie'} />
            <DialogComponent name={'REVIEW'} form={true} movies={props.movies} index={props.index}/>
            </CardActions>
          </Stack>
          </Box>}
         </>: 
        // not signed in
        ""}
      </Card>
    </Box>
  )
}

export default MovieCard;