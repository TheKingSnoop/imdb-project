import React from 'react'
import { Paper, Grid, Avatar, Typography, TextField, Button, Box } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

const Login = () => {
  //initialise react navigator
  const navigate = useNavigate()
  //initialise cookies
  const cookies = new Cookies();
  const [userInput, setUserInput] = useState({
    email: '',
    password: ''
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

    const login = async () => {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: "POST",
        body: JSON.stringify({
          email: userInput.email,
          password: userInput.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
      })
      const token = await response.json()

      cookies.set('jwt',token, { maxAge: 1000 * 60 * 60 * 2, httpOnly: false});
      navigate('/')
      navigate(0);
    }
    login()
  }

  const margin = { margin: '10px 0px' }
  return (
    <Grid align='center' sx={{marginTop: '10%'}}>
      <Paper elevation={20} sx={{ padding: '30px 20px', width: { md: '450px', xs: '350px' }, margin: '20px auto' }}>
        <Grid >
          <Avatar sx={{ marginBottom: '20px', backgroundColor: '#d32f2f' }}></Avatar>
          <Typography variant='h5' sx={{ fontWeight: "bold" }} gutterBottom>Login</Typography>
          <Typography sx={margin} variant='caption'>Please fill in this form to login.</Typography>

        </Grid>

        <form onSubmit={handleSubmit}>
          <TextField onChange={handleInputChange} name='email' value={userInput.email} sx={margin} type={"text"} fullWidth label='Email' required placeholder='For e.g. Molly@Treatz.com' />
          <TextField onChange={handleInputChange} name='password' value={userInput.password} sx={margin} type={"password"} fullWidth label='Password' required placeholder='Enter password' />
         <Button sx={margin} type='submit' variant='contained' color='primary'>Log in</Button>
          <Box>
            <Link to='/signup'>Don't have an account? Go to Sign up</Link></Box>
        </form></Paper>
    </Grid>
  )
}

export default Login