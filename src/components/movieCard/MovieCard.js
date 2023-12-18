import React from 'react';
import { Typography, Box, Card, CardContent, CardActions, Button, CardMedia, Stack } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { addToSeenIt, dynamicRating } from '../../service/movieCardService'
import './movieCard.css'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

const MovieCard = (props) => {
  const navigate = useNavigate()
  const cookies = new Cookies()

  const releaseYear = props.release_date.slice(0, 4)
  const colourRating = dynamicRating(props)

  const handleSubmit = () => {
    const movieToAdd = addToSeenIt(props)
    const addToMovieDatabase = async() => {
      const response = await fetch('http://localhost:3001/movie/addMovie', {
        method: 'POST',
        body: JSON.stringify(movieToAdd),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await response.json()
      console.log(data)
      if(data.errors) {
        alert(data.errors[0].msg)
      }
    }
    addToMovieDatabase()
  }

  const handleDelete = () => {
    const token = cookies.get('jwt')
    const movie_Id = props.movies[props.index]._id
    
    const deleteMovieFromDatabase = async() => {
      const response = await fetch(`http://localhost:3001/movie/my-movies/delete/${movie_Id}`, {
      method: 'DELETE',
      headers: {"Authorization" : "Bearer " + token.token, "Content-Type" : "application/json"}
    })
    const data = await response.json()
    console.log('has the movie been deleted?',data)
    navigate(0);
    }
    deleteMovieFromDatabase()
  }

  return (

    <Box width='200'>
      <Card sx={{ maxHeight: "600px", bgcolor: "secondary.light" }}>
        <CardMedia component='img' height='320' width='200' image={props.image} />
        <CardContent>
          <Typography variant='h6' gutterBottom sx={{ height: "30px", overflow: "hidden" }}>{props.title}</Typography>
          <Typography variant='body2' gutterBottom sx={{ display: "flex", flexDirection: "column", overflowX: "hidden", height: "90px" }}>{props.description}</Typography>

          <Stack direction="row" spacing={1}> <div className='rating'>
            <StarOutlineIcon sx={{ color: colourRating }} /><Typography variant='body2' sx={{ color: colourRating }}>{props.rating}</Typography>
          </div></Stack>
          <Typography variant='body2'>{releaseYear}</Typography>
        </CardContent>
        {props.currentUser ? <CardActions>
          <Button onClick={handleSubmit} size='small'>Seen It?</Button>
          <Button onClick={handleDelete} size='small'>DELETE</Button>
        </CardActions> : ""}
      </Card>


    </Box>
  )
}

export default MovieCard;