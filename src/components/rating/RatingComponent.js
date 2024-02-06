import { Rating, Box } from '@mui/material'
import React, { useState } from 'react'

const RatingComponent = ({ userInput, setUserInput }) => {

  const handleChange = (event, newValue) => {
    setUserInput({
      ...userInput,
      rating: newValue
    });
  }
  return (
   
    
        <Rating
          value={userInput.rating}
          precision={0.5}
          size='large'
          onChange={handleChange}
        />
   
   
  )
}

export default RatingComponent
