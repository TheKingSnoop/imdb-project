import { Avatar, Box, CardMedia, Typography, Card, Grid, TextField, Button, Container, Snackbar } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../service/movieCardService'

import shrek from '../images/shrekAvatar.jpeg';
import mulan from '../images/mulanAvatar.jpeg';
import woody from '../images/woodyAvatar.jpeg';
import maggie from '../images/maggieAvatar.jpeg';
import babyYoda from '../images/babyyodaAvatar.jpeg';
import wonderWoman from '../images/wonderWomanAvatar.png';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const MyProfile = ({API_HOST, API_PORT, isDarkMode}) => {
    const [open, setOpen] = useState(false)
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

    const getUserDetailsById = async () => {
        const token = cookies.get('jwt')
        const user = { name: jwtDecode(token.token).username, id: jwtDecode(token.token).userId }
        const user_Id = user.id
        const response = await fetch(`http://${API_HOST}:${API_PORT}/auth/user/${user_Id}`, {
            headers: { "Authorization": "Bearer " + token.token, "Content-Type": "application/json" },
          });
        const data = await response.json();

        if(data && data.error && data.error.message === "Unauthorized") {
            alert('Session expired, please login again.')
            navigate('/login')
          } else {
           setUserDetails(data);
           setUserInput({
            profilePic: data.profile_pic,
            favMovie: data.fav_movie,
            favQuote: data.fav_quote,
            favGenre: data.fav_genre
           })
          }  ;
    };

    const updateProfile = async () => {
        const response = await fetch(`http://${API_HOST}:${API_PORT}/auth/update-profile/${userDetails.userId}`, {
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
        setOpen(true)
        navigate(0);
    }
    useEffect(() => {
        getUserDetailsById();
    },[]) 

    const profileImages = [{
        value: "shrekAvatar",
        src: shrek,
        name: "shrek"
    },
    {
        value: "mulanAvatar",
        src: mulan,
        name: "mulan"
    },
    {
        value: "woodyAvatar",
        src: woody,
        name: "shrek"
    },
    {
        value: "babyYodaAvatar",
        src: babyYoda,
        name: "baby yoda"
    },
    {
        value: "maggieAvatar",
        src: maggie,
        name: "maggie"
    },
    {
        value: "wonderWomanAvatar",
        src: wonderWoman,
        name: "wonder woman"
    }
    ]
    const profilePic = (currentUser) => {
        if (currentUser === "shrekAvatar") {
            return shrek
        } else if (currentUser === "mulanAvatar") {
            return mulan
        } else if (currentUser === "woodyAvatar") {
            return woody
        } else if (currentUser === "babyYodaAvatar") {
            return babyYoda
        } else if (currentUser === "maggieAvatar") {
            return maggie
        } else if (currentUser === "wonderWomanAvatar") {
            return wonderWoman
        } else return null;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserInput({
            ...userInput,
            [name]: value
        })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile()

    }
    return (
        <Box sx={{  margin: '20px', minWidth: { sm: '550px', xs: '300px' } }}>
            <Typography variant='h4'sx={{textAlign: 'center', fontFamily: 'Russo One', color: isDarkMode && "white"}}  >My Profile</Typography>
            <Card sx={{ color: isDarkMode && "white", bgcolor: isDarkMode && "primary.light", padding: '20px', width: { sm: '700px', xs: '350px' } }}>
                <form onSubmit={handleSubmit}><Grid container spacing={2}>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {userDetails.profile_pic ? <CardMedia sx={{ marginBottom:'25px', borderRadius: '50%', height: { md: '300px', sm: '200px', xs: '150px' }, width: { md: '300px', sm: '200px', xs: '150px' } }} component='img' image={profilePic(userInput.profilePic)} width='100%' /> : <Avatar sx={{ height: { md: '300px', sm: '200px', xs: '150px' }, width: { md: '300px', sm: '200px', xs: '150px' }, bgcolor: '#d32f2f' }} />}
                    </Grid>
                    <Box sx={{ width:'100%', display:'flex', justifyContent:'center'}}>
                            <Typography>Change Profile Picture:</Typography>
                    </Box>
                    <Grid item xs={12} sx={{display:'flex', justifyContent:'center'}}>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="Profile picture options"
                                name="profilePic"
                            >
                                <Container sx={{ width:'100%', display:'flex'}}>
                                    <Grid container  sx={{ display: 'flex', justifyContent:'center', alignItems:'center', paddingBottom:'15px'}}>

                                    {profileImages.map((image, index) => {
                                        return (
                                        <Grid item key={index} sm={2} xs={6} sx={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                                            <Box  component='img' src={image.src} alt={image.name} sx={{ width: '75px', height: '75px', borderRadius: '50%', margin: '10px' }}>
                                            </Box>
                                            <FormControlLabel value={image.value} onChange={handleInputChange} sx={{ padding: '0px', margin: '0px' }} control={<Radio sx={{ padding: '0px', margin: '0px', color: isDarkMode && 'white' }} />} />
                                        </Grid>
                                        )
                                    })}</Grid></Container>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Typography color='grey' textAlign='left' marginLeft='20px'>First Name: {userDetails.name}</Typography>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Typography color='grey' textAlign='left' marginLeft='20px'>Surname: {userDetails.surname}</Typography>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Typography color='grey' textAlign='left' marginLeft='20px'>Username: {userDetails.username}</Typography>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Typography color='grey' textAlign='left' marginLeft='20px'>Joined Since: {ukDateFormat}</Typography>
                    </Grid>
                    <Grid item xs={12} textAlign='left' margin='0px 20px'>
                        {/* <Typography gutterBottom textAlign='left'> Favourite Movie: {userDetails.fav_movie}</Typography> */}
                        <TextField fullWidth type={"text"} label='Favourite Movie' placeholder='Bones and All' onChange={handleInputChange} name='favMovie' value={userInput.favMovie} />
                    </Grid>
                    <Grid item xs={12} textAlign='left' margin='0px 20px'>
                        <TextField fullWidth type={"text"} label='Favourite Quote' placeholder='Keep the change ya filthy animal' onChange={handleInputChange} name='favQuote' value={userInput.favQuote} />
                    </Grid>
                    <Grid item xs={12} textAlign='left' marginLeft='20px'>
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel>Favourite Genre</InputLabel>
                            <Select
                                value={userInput.favGenre}
                                onChange={handleInputChange}
                                name={'favGenre'}
                                label='Favourite Genre'
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
                                <MenuItem value='Sci-Fi'>Sci-Fi</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Box sx={{display:'flex', justifyContent:'center', padding:'20px'}}>
                    <Button type='submit' variant='contained' color='primary'>Update Profile</Button>
                <Snackbar 
                message='Profile Updated' 
                autoHideDuration={2000}
                open={open}
                onClose={() => setOpen(false)}
                anchorOrigin={{
                  vertical:'bottom',
                  horizontal:'center'
                }}/></Box></form>
                
            </Card>
        </Box>
    )
}

export default MyProfile