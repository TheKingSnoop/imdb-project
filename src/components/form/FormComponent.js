import React from 'react'
import { Typography, TextField, Button, Box, Stack, Grid } from '@mui/material'
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RatingComponent from '../rating/RatingComponent'
import IsFavouriteButton from '../toggleButton/IsFavouriteButton'
import DatePickerComponent from '../datePickerComponent/DatePickerComponent';

const FormComponent = ({ API_HOST, setOpen, movies, index }) => {
  const [userInput, setUserInput] = useState({
    rating: movies[index].userReviewId[0].user_rating,
    analysis: movies[index].userReviewId[0].user_analysis,
    isFavourite: movies[index].userReviewId[0].isFavourite,
    dateWatched: new Date()
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserInput({
      ...userInput,
      [name]: value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const review_Id = movies[index].userReviewId[0]._id
    const addReviewToDatabase = async () => {
      const response = await fetch(`http://${API_HOST}/review/updateMyReview/${review_Id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          user_rating: userInput.rating,
          user_analysis: userInput.analysis,
          isFavourite: userInput.isFavourite,
          dateWatched: userInput.dateWatched
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await response.json()
      setOpen(false)
      navigate(0);
    }
    addReviewToDatabase()
  }

  const margin = { margin: '10px 0px' }

  return (
    <Box align='center' sx={{ padding: '0 20px', width: { sm: '450px', xs: '300px' } }}>
      <Box sx={{marginBottom:'30px', maxWidth:'100%'}}>
        <RateReviewIcon color='primary' sx={{ marginBottom: '20px', fontSize: '50px' }} />
        <Typography variant='h5' sx={{ fontWeight: "bold" }}>Review</Typography>
        <Typography variant='caption'>Add your review below.</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} padding='10px'>
          
          <Grid item xs={4} sm={7} align='left' sx={{display:'flex', alignItems:'center'}}><Typography variant='body2'>Rate this movie</Typography></Grid>
          <Grid item xs={8} sm={5} sx={{display:'flex', alignItems:'center'}}><RatingComponent userInput={userInput} setUserInput={setUserInput} /></Grid>
  
          <Grid item xs={9} sm={4} sx={{display:'flex', alignItems:'center'}}><Typography variant='body2'>Add to Favourites?</Typography></Grid>
          <Grid item xs={3} sm={2} sx={{display:'flex', alignItems:'center'}}><IsFavouriteButton userInput={userInput} setUserInput={setUserInput}/></Grid>
          <Grid item xs={12} sm={6} align='right'><DatePickerComponent userInput={userInput} setUserInput={setUserInput}/></Grid>
          <Grid item xs={12}><TextField onChange={handleInputChange} name='analysis' multiline rows={2} value={userInput.analysis} sx={margin} type={"text"} fullWidth label='Analysis' placeholder='For e.g. The ending of this movie was spectacular' /></Grid>
        </Grid>
        {/* old: */}
        
          
 
              
            
           
        
          
          <Button sx={margin} type='submit' variant='contained' color='primary'>Add Review</Button>
      </form>
    </Box>
  )
}

export default FormComponent