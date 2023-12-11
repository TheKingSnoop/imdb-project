import { Paper, Grid, Avatar, Typography, TextField, Button, Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const margin = {margin: '10px 0px'}
  return (
    <Grid align='center'>
      <Paper elevation={20} sx={{padding:'30px 20px', width: '450px', margin:'20px auto'}}>
        <Grid >
          <Avatar sx={{marginBottom: '20px', backgroundColor: '#d32f2f'}}></Avatar>
    <Typography variant='h5' sx={{fontWeight: "bold"}} gutterBottom>Sign Up</Typography>
    <Typography sx={margin} variant='caption'>Please fill in this form to create an account.</Typography>

        </Grid>
    
    <form>
      <TextField sx={margin} type={"text"} fullWidth label='First Name' placeholder='Enter your name'/>
      <TextField sx={margin} type={"text"} fullWidth label='Surname' placeholder='Enter your surname'/>
      <TextField sx={margin} type={"text"} fullWidth label='Email' placeholder='For e.g. Molly@Treatz.com'/>
      <TextField sx={margin} type={"text"} fullWidth label='Username' placeholder='Create a username'/>
      <TextField sx={margin} type={"password"} fullWidth label='Create Password' placeholder='Create a password'/>
      <TextField sx={margin} type={"password"} fullWidth label='Confirm Password'placeholder='Confirm your password'/>
      <Button type='submit' variant='contained' color='primary'>Sign Up</Button>
      <Box>
      <Link to='/login'>Already got an account? Go to Login</Link></Box>
    </form></Paper>
    </Grid>
  )
}

export default SignUp