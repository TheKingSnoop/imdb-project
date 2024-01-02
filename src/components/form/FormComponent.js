import React from 'react'
import { Paper, Grid, Typography, TextField, Button, Box, Stack } from '@mui/material'
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RatingComponent from '../rating/RatingComponent'

const FormComponent = ({setOpen}) => {
  const [userInput, setUserInput] = useState({
    rating: '',
    analysis: '',
    isFavourite: false
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserInput({
      ...userInput,
      [name]: value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(userInput)
    setOpen(false)
  }

const margin = { margin: '10px 0px' }

  return (
    <Box align='center' sx={{ padding: '0 20px', width: { md: '450px', xs: '350px'} }}>
    {/* <Paper elevation={20} sx={{ padding: '30px 20px', width: { md: '450px', xs: '350px' }, margin: '20px auto' }}> */}
      <Grid>
        <RateReviewIcon sx={{ marginBottom: '20px', fontSize: '50px'}}/>
        <Typography variant='h5' sx={{ fontWeight: "bold" }} gutterBottom>Review</Typography>
        <Typography sx={margin} variant='caption'>Please fill in this form to add a review.</Typography>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextField onChange={handleInputChange} name='analysis' value={userInput.analysis} sx={margin} type={"text"} fullWidth label='Analysis'  placeholder='For e.g. Molly@Treatz.com' />
          <RatingComponent userInput ={userInput} setUserInput={setUserInput}/>      
          <Button sx={margin} type='submit' variant='contained' color='primary'>Add Review</Button>
        </Stack>
      </form>
      {/* </Paper> */}
  </Box>
  )
}

export default FormComponent