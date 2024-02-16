import { Paper, Grid, Avatar, Typography, TextField, Button, Box } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignUp = ({API_HOST, isDarkMode}) => {
  const initialValues = {
    name: '',
    surname: '',
    email: '',
    username: '',
    createPassword: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3,'Name must at least 3 character').required('Required'),
    surname: Yup.string().min(3,'Surname must be greater than 3 character').required('Required'),
    email: Yup.string().email('Enter valid email').required('Required'),
    username: Yup.string().min(3,'username must be at least 3 character').required('Required'),
    createPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('createPassword')], 'Passwords do not match').required('Required')
  });

  const navigate = useNavigate()

  const handleSubmit = (values, props) => {
    // console.log(props)
    let data = null
   
      const signUp = async () => {
        const response = await fetch(`http://${API_HOST}/auth/signup`, {
          method: "POST",
          body: JSON.stringify({
            email: values.email,
            password: values.createPassword,
            username: values.username,
            name: values.name,
            surname: values.surname,
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        data = await response.json();
      }
      signUp();
      setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false)
      if(data.errors) {
        alert(data.errors[0].msg)}
      else {alert('Successfully created an acount, redirecting you to the login page.')
      navigate('/login')}
      
    },1500)
      
  }
  const margin = { margin: '10px 0px' }
  return (
    <Grid align='center'>
      <Paper elevation={20} sx={{ padding: '30px 20px', width: { md: '450px', xs: '350px' }, margin: '20px auto', bgcolor: isDarkMode ? '#d6d6d6': 'white' }}>
        <Grid >
          <Avatar sx={{ marginBottom: '20px', backgroundColor: '#d32f2f' }}></Avatar>
          <Typography variant='h5' sx={{ fontWeight: "bold" }} gutterBottom>Sign Up</Typography>
          <Typography sx={margin} variant='caption'>Please fill in this form to create an account.</Typography>
        </Grid>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {(props) => (
            <Form>
              <Field as={TextField} name='name' sx={margin} fullWidth label='Name' placeholder='Enter your name' helperText={<ErrorMessage name='name'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>}/>
              <Field as={TextField} name='surname' sx={margin} fullWidth label='Surname' placeholder='Enter your surname' helperText={<ErrorMessage name='surname'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>}/>
              <Field as={TextField} name='email' sx={margin} type={"text"} fullWidth label='Email' placeholder='For e.g. Molly@Treatz.com' helperText={<ErrorMessage name='email'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>} />
              <Field as={TextField} name='username' sx={margin} type={"text"} fullWidth label='Username' placeholder='Create a username' helperText={<ErrorMessage name='username'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>}/>
              <Field as={TextField} name='createPassword' sx={margin} type={"password"} fullWidth label='Create Password' placeholder='Create a password' helperText={<ErrorMessage name='createPassword'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>}/>
              <Field as={TextField} name='confirmPassword' sx={margin} type={"password"} fullWidth label='Confirm Password' placeholder='Confirm your password' helperText={<ErrorMessage name='confirmPassword'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>}/>
              <Button sx={margin} type='submit' variant='contained' color='primary' disabled={props.isSubmitting}>{props.isSubmitting ? 'Loading': 'Sign Up'}</Button>
              <Box>
                <Link to='/login'>Already got an account? Go to Login</Link>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  )
}

export default SignUp

