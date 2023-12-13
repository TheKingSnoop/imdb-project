import React from 'react';
import { useState } from 'react';
import "./NavBar.css"
import TheatersIcon from '@mui/icons-material/Theaters';

import { AppBar, CssBaseline, Typography, Toolbar, Button, useMediaQuery, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import DrawerComp from '../drawer/DrawerComp';

const Navbar = () => {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position='static' color='secondary'>
                <Toolbar>
                    <TheatersIcon />
                    {isMatch ? (
                        <>
                            {/* Mobile View */}
                            <DrawerComp />
                        </>
                    ) : <>
                        {/* Desktop View */}
                        <Typography sx={{ marginLeft: '10px' }}>SEEN IT</Typography> <Button variant='contained' sx={{ backgroundColor: 'secondary.light', marginLeft: 'auto' }}>Login</Button>
                        <Button variant='contained' sx={{ backgroundColor: 'secondary.light', marginLeft: '10px' }}>Sign Up</Button>
                        <Button variant='contained' sx={{ backgroundColor: 'secondary.dark', marginLeft: '10px' }}>Dark Mode</Button>
                    </>}

                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Navbar