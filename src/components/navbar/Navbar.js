import React from 'react';
import { useState } from 'react';
import TheatersIcon from '@mui/icons-material/Theaters';
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

import { Box, AppBar, CssBaseline, Typography, Toolbar, Button, useMediaQuery, useTheme, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import DrawerComp from '../drawer/DrawerComp';
import seenItLogo from '../../images/SeenItLogo.png';
import mobileSeenItLogo from '../../images/MobileSeenItLogo.png';

const Navbar = ({ currentUser, isDarkMode, setIsDarkMode }) => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    // console.log(currentUser)

    const logout = () => {
        cookies.remove('jwt');
        navigate('/');
        window.location.reload();
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar color='primary' height="500px">
                <Toolbar>
                    {isMatch ? (
                        <>
                            {/* Mobile View */}
                            <Stack sx={{ paddingTop: '5px' }}>
                                <NavLink to='/'><img src={mobileSeenItLogo} height='40px' width='auto' alt='seen it logo' />
                                </NavLink>
                            </Stack>
                            {currentUser && 
                            <Box sx={{display:'flex', justifyContent: 'center', width:'100%'}}>
                            <NavLink to='/myprofile'><Button><Typography sx={{color: 'white', fontFamily: 'Russo One', marginLeft: 'auto' }}>Hello  {currentUser.name}</Typography></Button></NavLink>
                            </Box>}
                            <DrawerComp currentUser={currentUser} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} logout={logout} />
                        </>
                    ) : <>
                        {/* Desktop View */}
                        <Stack sx={{ paddingTop: '5px' }}>
                            <NavLink to='/'><img src={seenItLogo} height='40px' width='auto' alt='seen it logo' />
                            </NavLink>
                        </Stack>
                        {!currentUser ?
                            <Stack sx={{margin: 'auto'}}>
                            </Stack>   : <Stack sx={{display:'flex', justifyContent: 'center', margin: 'auto'}}>
                            <NavLink to='/myprofile'>
                            <Button>
                                <Typography variant='h5' sx={{ color: 'white', fontFamily: 'Russo One'}}>Hello {currentUser.name}</Typography>
                                </Button>
                            </NavLink>
                            </Stack>    
                        } 
                        <Stack direction='row' >
                            
                            {!currentUser ? 
                                <>
                                <NavLink to='/login'>
                                    <Button variant='contained' sx={{ backgroundColor: 'primary.light'}}>Login</Button>
                                </NavLink>
                                <NavLink to='/signup'>
                                    <Button variant='contained' sx={{ backgroundColor: 'primary.light', marginLeft: '10px' }}>Sign Up</Button>
                                </NavLink>
                                </> 
                                :
                                 <>
                                
                                <NavLink to='/mymovies'>
                                    <Button variant='contained' sx={{ backgroundColor: 'primary.light'}}>my movies</Button>
                                </NavLink>
                                <NavLink to='/users'>
                                    <Button variant='contained' sx={{ backgroundColor: 'primary.light', marginLeft: '10px' }}>users</Button>
                                </NavLink>
                                <Button onClick={logout} variant='contained' sx={{ backgroundColor: 'primary.light', marginLeft: '10px' }}>Log out</Button>
                            </>}
                            <Button onClick={() => setIsDarkMode(prev => !prev)} variant='contained' sx={{ backgroundColor: 'primary.dark', marginLeft: '10px', '&:hover': { backgroundColor: 'primary.light' } }}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Button>
                        </Stack>
                    </>}

                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Navbar