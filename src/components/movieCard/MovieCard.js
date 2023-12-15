import { Typography, Box, Card, CardContent, CardActions, Button, CardMedia, Stack } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import React from 'react';
import './movieCard.css'


const MovieCard = (props) => {
  console.log(props)
  const releaseYear = props.release_date.slice(0,4)
  let colourRating = "black"

  if(props.rating <= 6){
    colourRating = "brown"
  } else {
    colourRating = "gold"
  }

  function addToSeenIt() {
    const addMovie = {
      tmdb_id: props.movies[props.index].tmdb_id,
      title: props.movies[props.index].title,
      description: props.movies[props.index].description,
      rating: props.movies[props.index].rating,
      image: props.movies[props.index].image,
      release_date: props.movies[props.index].release_date
    }
    console.log(addMovie)
  }
  return (

    <Box width='200'>
      <Card sx={{ maxHeight: "600px", bgcolor: "secondary.light" }}>
        <CardMedia component='img' height='320' width='200' image={props.image} />
        <CardContent>
          <Typography variant='h6' gutterBottom sx={{ height: "30px", overflow: "hidden" }}>{props.title}</Typography>
          <Typography variant='body2' gutterBottom sx={{ display: "flex", flexDirection: "column", overflowX: "hidden", height: "90px" }}>{props.description}</Typography>

          <Stack direction="row" spacing={1}> <div className='rating'>
            <StarOutlineIcon sx={{color: colourRating}} /><Typography variant='body2' sx={{color: colourRating}}>{props.rating}</Typography>
          </div></Stack>
          <Typography variant='body2'>{releaseYear}</Typography>
          {/* Remove this- Testing Only */}
          <Button onClick={addToSeenIt}>Seen It TEST</Button>
        </CardContent>
        {props.currentUser ? <CardActions>
          <Button size='small'>Seen It?</Button>
        </CardActions> : ""}
      </Card>


    </Box>
  )
}

export default MovieCard;