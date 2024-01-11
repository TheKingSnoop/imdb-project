import React from 'react'
import { Grid, Typography, TextField, Button, Box, Stack } from '@mui/material'
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RatingComponent from '../rating/RatingComponent'
import IsFavouriteButton from '../toggleButton/IsFavouriteButton'
import DatePickerComponent from '../datePickerComponent/DatePickerComponent';

const FormComponent = ({ setOpen, movies, index }) => {
  const [userInput, setUserInput] = useState({
    rating: null,
    analysis: '',
    isFavourite: false,
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
    //console.log('review_Id', review_Id)
    console.log(userInput)
    const addReviewToDatabase = async () => {
      const response = await fetch(`http://localhost:3001/review/updateMyReview/${review_Id}`, {
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
      console.log(data)
      setOpen(false)
      navigate(0);
    }
    addReviewToDatabase()
  }

  const margin = { margin: '10px 0px' }

  return (
    <Box align='center' sx={{ padding: '0 20px', width: { md: '450px', xs: '300px' } }}>
      <Grid sx={{marginBottom:'50px', maxWidth:'100%'}}>
        <RateReviewIcon color='primary' sx={{ marginBottom: '20px', fontSize: '50px' }} />
        <Typography variant='h5' sx={{ fontWeight: "bold" }}>Review</Typography>
        <Typography variant='caption'>Please fill in this form to add a review.</Typography>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Stack direction='row' spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant='body2'>Rate this movie</Typography>
          <RatingComponent userInput={userInput} setUserInput={setUserInput} />
          </Stack>
          <Stack direction='row' spacing={2} sx={{ display: 'flex', alignItems: 'baseline', justifyContent:'space-between'}}>
            <Stack direction='row' spacing={2} sx={{ display: 'flex', alignItems: 'baseline'}}>
              <Typography variant='body2'>Add to Favourites?</Typography>
              <IsFavouriteButton userInput={userInput} setUserInput={setUserInput}/>
            </Stack>
            <DatePickerComponent userInput={userInput} setUserInput={setUserInput}/>
          </Stack>
          <TextField onChange={handleInputChange} name='analysis' multiline rows={2} value={userInput.analysis} sx={margin} type={"text"} fullWidth label='Analysis' placeholder='For e.g. The ending of this movie was spectacular' />
          <Button sx={margin} type='submit' variant='contained' color='primary'>Add Review</Button>
      </form>
    </Box>
  )
}

export default FormComponent