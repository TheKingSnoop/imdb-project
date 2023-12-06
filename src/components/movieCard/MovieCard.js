import { Typography } from '@mui/material';
import React from 'react';
import './movieCard.css'


const MovieCard = (props) => {
 
  return (
    <div className='movie_card'>
        <div className='movie_card_img'><img  src={props.image} width={200} height={320}/></div>
   <Typography variant='h6'>{props.title}</Typography>
   <Typography variant='h8'>{props.description}</Typography>
   <br/>
   <Typography variant='h8'>{props.rating}</Typography>
   <br/>
   <Typography variant='h8'>{props.release_date}</Typography>
    </div>
  )
}

export default MovieCard;