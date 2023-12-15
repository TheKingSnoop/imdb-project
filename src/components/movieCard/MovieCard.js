import React from 'react';
import { Typography, Box, Card, CardContent, CardActions, Button, CardMedia, Stack } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { addToSeenIt, dynamicRating } from '../../service/movieCardService'
import './movieCard.css'

const MovieCard = (props) => {
  const releaseYear = props.release_date.slice(0, 4)
  const colourRating = dynamicRating(props)

  const handleSubmit = () => {
    //console.log(props.currentUser.id)
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
    }
    addToMovieDatabase()
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
        </CardActions> : ""}
      </Card>


    </Box>
  )
}

export default MovieCard;