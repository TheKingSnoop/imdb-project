import { Typography, Box, Card, CardContent, CardActions, Button, CardMedia, Stack } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import React from 'react';
import './movieCard.css'


const MovieCard = (props) => {
  const userLoggedIn = false
  return (

    <Box width='200'>
      {userLoggedIn ?
        <Card sx={{maxHeight: "600px"}}>
          <CardMedia component='img' height='320' width='200' image={props.image} />
          <CardContent>
            <Typography variant='h6' gutterBottom  sx={{height:"30px", overflow: "hidden"}}>{props.title}</Typography>
            <Typography variant='body2' gutterBottom sx={{display: "flex", flexDirection:"column", overflowX:"hidden", height: "90px"}}>{props.description}</Typography>

            <Stack direction="row" spacing={1}> <div className='rating'>
              <StarOutlineIcon /><Typography variant='body2'>{props.rating}</Typography>
            </div></Stack>
            <Typography variant='body2'>Relesase Date:{props.release_date}</Typography>
          </CardContent>
          <CardActions>
            <Button size='small'>Review</Button>
            <Button size='small'>Seen It?</Button>
          </CardActions>
        </Card>
        :
        <Card sx={{maxHeight: "600px"}}>
        <CardMedia component='img' height='320' width='200' image={props.image} />
          <CardContent>
            <Typography variant='h6' gutterBottom  sx={{height:"30px", overflow: "hidden"}}>{props.title}</Typography>
            <Typography variant='body2' gutterBottom sx={{display: "flex", flexDirection:"column", overflowX:"hidden", height: "90px"}}>{props.description}</Typography>

            <Stack direction="row" spacing={1}> <div className='rating'>
              <StarOutlineIcon /><Typography variant='body2'>{props.rating}</Typography>
            </div></Stack>
            <Typography variant='body2'>Release Date: {props.release_date}</Typography>
          </CardContent></Card>}

    </Box>
  )
}

export default MovieCard;