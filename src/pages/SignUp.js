import { Paper, Grid, Avatar, Typography, TextField, Button, Box } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [userInput, setUserInput] = useState({
    name: '',
    surname: '',
    email: '',
    username: '',
    createPassword: '',
    confirmPassword: ''
  });
  const navigate = useNavigate()

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

    // const signUp = async () => {
    //   const response = await fetch('http://localhost:3001/auth/signup', {
    //     method: "POST",
    //     body: JSON.stringify({
    //       email: userInput.email,
    //       password: userInput.createPassword,
    //       username: userInput.username,
    //       name: userInput.name,
    //       surname: userInput.surname
    //     }),
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   })
    //   console.log(response)
    //   const data = await response.json();
    //   console.log(data)
    // }
    // signUp();
    alert('Successfully created an acount, redirecting you to the login page.')
    navigate('/login')
  }
  const margin = { margin: '10px 0px' }
  return (
    <Grid align='center'>
      <Paper elevation={20} sx={{ padding: '30px 20px', width: { md: '450px', xs: '350px' }, margin: '20px auto' }}>
        <Grid >
          <Avatar sx={{ marginBottom: '20px', backgroundColor: '#d32f2f' }}></Avatar>
          <Typography variant='h5' sx={{ fontWeight: "bold" }} gutterBottom>Sign Up</Typography>
          <Typography sx={margin} variant='caption'>Please fill in this form to create an account.</Typography>

        </Grid>

        <form onSubmit={handleSubmit}>
          <TextField onChange={handleInputChange} name='name' value={userInput.name} sx={margin} type={"text"} fullWidth label='First Name' required placeholder='Enter your name' />
          <TextField onChange={handleInputChange} name='surname' value={userInput.surname} sx={margin} type={"text"} fullWidth label='Surname' required placeholder='Enter your surname' />
          <TextField onChange={handleInputChange} name='email' value={userInput.email} sx={margin} type={"text"} fullWidth label='Email' required placeholder='For e.g. Molly@Treatz.com' />
          <TextField onChange={handleInputChange} name='username' value={userInput.username} sx={margin} type={"text"} fullWidth label='Username' required placeholder='Create a username' />
          <TextField onChange={handleInputChange} name='createPassword' value={userInput.createPassword} sx={margin} type={"password"} fullWidth label='Create Password' required placeholder='Create a password' />
          <TextField onChange={handleInputChange} name='confirmPassword' value={userInput.confirmPassword} sx={margin} type={"password"} fullWidth label='Confirm Password' required placeholder='Confirm your password' />
          <Button sx={margin} type='submit' variant='contained' color='primary'>Sign Up</Button>
          <Box>
            <Link to='/login'>Already got an account? Go to Login</Link></Box>
        </form></Paper>
    </Grid>
  )
}

export default SignUp