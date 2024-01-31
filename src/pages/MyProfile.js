import { Box, CardMedia, Typography, Card, Grid, TextField, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../service/movieCardService'

import marioCover from '../images/marioCover.jpeg'
import shrek from '../images/shrekAvatar.jpeg';
import mulan from '../images/mulanAvatar.jpeg';
import woody from '../images/woodyAvatar.jpeg';
import maggie from '../images/maggieAvatar.jpeg';
import babyyoda from '../images/babyyodaAvatar.jpeg';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import { maxWidth } from '@mui/system';

const MyProfile = () => {
    const [userDetails, setUserDetails] = useState({})
    const [userInput, setUserInput] = useState({
        profilePic: "",
        favMovie: "",
        favQuote: "",
        favGenre: ""
    })
    const cookies = new Cookies();
    const navigate = useNavigate();
    const ukDateFormat = formatDate(userDetails.date_joined);

    const getUserDetailsById = async() => {
        const token = cookies.get('jwt')
        const user = { name: jwtDecode(token.token).username, id: jwtDecode(token.token).userId }
        const user_Id = user.id
        const response = await fetch(`http://localhost:3001/auth/user/${user_Id}`)
        const data = await response.json()
        setUserDetails(data);
    }

    const updateProfile = async() => {
        const response = await fetch(`http://localhost:3001/auth/update-profile/${userDetails.userId}`, {
            method: 'PATCH',
            body: JSON.stringify({
              profile_pic: userInput.profilePic,
              fav_movie: userInput.favMovie,
              fav_quote: userInput.favQuote,
              fav_genre: userInput.favGenre
            }),
            headers: {
              "Content-Type": "application/json"
            }
          })
          const data = await response.json()
          setUserDetails(data);
          navigate(0);
    }
    useEffect(() => {
       getUserDetailsById();
    }, [])
    


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserInput({
            ...userInput,
            [name]: value
        })
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        updateProfile()
        
    }
    return (
        <Box sx={{ marginTop: '20px', minWidth: { sm: '550px', xs: '300px' } }}>
            <Typography variant='h2' >My Profile</Typography>
            <Card sx={{ padding: '10px', width: { sm: '700px', xs: '350px' } }}>
                <form onSubmit={handleSubmit}><Grid container spacing={2}>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CardMedia sx={{ borderRadius: '50%', height: { md: '350px', sm: '250px', xs: '150px' }, width: { md: '350px', sm: '250px', xs: '150px' } }} component='img' image={marioCover} width='100%' />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Change Profile Picture</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="Profile picture options"
                                name="profilePic"
                            >
                                <Box sx={{ borderRight: '2px solid grey' }}>
                                    <FormControlLabel value="shrek" onChange={handleInputChange} sx={{ padding: '0px', margin: '0px' }} control={<Radio sx={{ padding: '0px', margin: '0px' }} />} />
                                    <Box component='img' sx={{ width: '75px', height: '75px', borderRadius: '50%', margin: '10px' }} alt='shrek' src={shrek}>
                                    </Box>

                                </Box>
                                <Box sx={{ borderRight: '2px solid grey' }}>
                                    <FormControlLabel value="mulan" onClick={handleInputChange} sx={{ padding: '0px', margin: '0px' }} control={<Radio />} />
                                    <Box component='img' sx={{ width: '75px', height: '75px', borderRadius: '50%', margin: '10px' }} alt='mulan' src={mulan}>

                                    </Box>
                                </Box>
                                <Box sx={{ borderRight: '2px solid grey' }}>
                                    <FormControlLabel value="woody" onClick={handleInputChange} sx={{ padding: '0px', margin: '0px' }} control={<Radio />} />
                                    <Box component='img' sx={{ width: '75px', height: '75px', borderRadius: '50%', margin: '10px' }} alt='woody' src={woody}>

                                    </Box>
                                </Box>
                                <Box sx={{ borderRight: '2px solid grey' }}>
                                    <FormControlLabel value="babyyoda" onClick={handleInputChange} sx={{ padding: '0px', margin: '0px' }} control={<Radio />} />
                                    <Box component='img' sx={{ width: '75px', height: '75px', borderRadius: '50%', margin: '10px' }} alt='babyyoda' src={babyyoda}>

                                    </Box>
                                </Box>
                                <Box>
                                    <FormControlLabel value="maggie" onClick={handleInputChange} sx={{ padding: '0px', margin: '0px' }} control={<Radio />} />
                                    <Box component='img' sx={{ width: '75px', height: '75px', borderRadius: '50%', margin: '10px' }} alt='maggie' src={maggie}>

                                    </Box>
                                </Box>
                                
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Typography textAlign='left' marginLeft='20px'>First Name: {userDetails.name}</Typography>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Typography textAlign='left' marginLeft='20px'>Last Name: {userDetails.surname}</Typography>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Typography textAlign='left' marginLeft='20px'>Username: {userDetails.username}</Typography>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Typography textAlign='left' marginLeft='20px'>Joined Since: {ukDateFormat}</Typography>
                    </Grid>
                    <Grid item xs={12} textAlign='left' margin='0px 20px'>
                    <Typography textAlign='left'> Favourite Movie: {userDetails.fav_movie}</Typography>
                        <TextField fullWidth type={"text"} label='Update Favourite Movie' placeholder='Bones and All' onChange={handleInputChange} name='favMovie' value={userInput.favMovie} />
                    </Grid>
                    <Grid item xs={12} textAlign='left' margin='0px 20px'>
                    <Typography textAlign='left'> Favourite Movie Quote: {userDetails.fav_quote}</Typography>
                        <TextField fullWidth type={"text"} label='Update Favourite Quote' placeholder='Keep the change ya filthy animal' onChange={handleInputChange} name='favQuote' value={userInput.favQuote} />
                    </Grid>
                    <Grid item xs={12} textAlign='left' marginLeft='20px'>
                    <Typography textAlign='left'> Favourite Genre: {userDetails.fav_genre}</Typography>

                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel>Genre</InputLabel>
                            <Select
                                value={userInput.favGenre}
                                onChange={handleInputChange}
                                name={'favGenre'}
                                label='Genre'
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value='Action'>Action</MenuItem>
                                <MenuItem value='Comedy'>Comedy</MenuItem>
                                <MenuItem value='Romance'>Romance</MenuItem>
                                <MenuItem value='Anime'>Anime</MenuItem>
                                <MenuItem value='Horror'>Horror</MenuItem>
                                <MenuItem value='Thriller'>Thriller</MenuItem>
                                <MenuItem value='Drama'>Drama</MenuItem>
                                <MenuItem value='Animation'>Animation</MenuItem>
                                <MenuItem value='Fantasy'>Fantasy</MenuItem>
                                <MenuItem value='Adventure'>Adventure</MenuItem>
                                <MenuItem value='Musical'>Musical</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button type='submit' variant='contained' color='primary'>Update Profile</Button>
                </form>
            </Card>
        </Box>
    )
}

export default MyProfile