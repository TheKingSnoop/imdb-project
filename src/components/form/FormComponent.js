import React from 'react'
import { Paper, Grid, Avatar, Typography, TextField, Button, Box } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Rating from '../rating/Rating'

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
    console.log('i submitted')
    setOpen(false)
  }

const margin = { margin: '10px 0px' }

  return (
    <Grid align='center'>
    <Paper elevation={20} sx={{ padding: '30px 20px', width: { md: '450px', xs: '350px' }, margin: '20px auto' }}>
      <Grid >
        <Avatar sx={{ marginBottom: '20px', backgroundColor: '#d32f2f' }}></Avatar>
        <Typography variant='h5' sx={{ fontWeight: "bold" }} gutterBottom>Review</Typography>
        <Typography sx={margin} variant='caption'>Please fill in this form to add a review.</Typography>
      </Grid>

      <form onSubmit={handleSubmit}>
        <TextField onChange={handleInputChange} name='analysis' value={userInput.analysis} sx={margin} type={"text"} fullWidth label='Analysis'  placeholder='For e.g. Molly@Treatz.com' />
        <Rating userInput ={userInput} setUserInput={setUserInput}/>      
         <Button sx={margin} type='submit' variant='contained' color='primary'>Log in</Button>
        <Box>
          </Box>
      </form></Paper>
  </Grid>
  )
}

export default FormComponent