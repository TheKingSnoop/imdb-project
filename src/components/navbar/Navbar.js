import React from 'react';
import { useState } from 'react';
import TheatersIcon from '@mui/icons-material/Theaters';
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

import { AppBar, CssBaseline, Typography, Toolbar, Button, useMediaQuery, useTheme, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import DrawerComp from '../drawer/DrawerComp';

const Navbar = ({currentUser}) => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    const logout = () => {
        cookies.remove('jwt');
        navigate('/');
    window.location.reload();
    } 
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position='static' color='secondary'>
                <Toolbar>
                    
                    <NavLink to='/'>
                        <TheatersIcon sx={{ color: "white", display: 'flex', alignItems: 'center'}} /></NavLink>
                    {isMatch ? (
                        <>
                            {/* Mobile View */}
                            {currentUser && <Typography sx={{marginLeft: 'auto'}}>Hello  {currentUser.name}</Typography>}
                            <DrawerComp currentUser={currentUser} logout={logout}/>
                        </>
                    ) : <>
                        {/* Desktop View */}
                        <Typography sx={{ marginLeft: '10px' }}>SEEN IT</Typography>
                        <Stack direction='row' sx={{marginLeft: 'auto'}}>
                        {!currentUser? <><NavLink to='/login'>
                        <Button variant='contained' sx={{ backgroundColor: 'secondary.light'}}>Login</Button>
                        </NavLink> <NavLink to='/signup'>
                        <Button variant='contained' sx={{ backgroundColor: 'secondary.light', marginLeft: '10px' }}>Sign Up</Button>
                        </NavLink> </>:<>
                        <Typography sx={{display: 'flex', alignItems: 'center'}}>Hello {currentUser.name}</Typography>
                        <Button onClick={logout} variant='contained' sx={{ backgroundColor: 'secondary.light', marginLeft: '60px' }}>Log out</Button>
                       
                       </>}
                        <Button variant='contained' sx={{ backgroundColor: 'secondary.dark', marginLeft: '10px' }}>Dark Mode</Button>
                    </Stack>
                    </>}

                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Navbar