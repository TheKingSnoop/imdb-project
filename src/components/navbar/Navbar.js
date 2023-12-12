import React from 'react'
import { useState } from 'react';
import "./NavBar.css"
import TheatersIcon from '@mui/icons-material/Theaters';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, CssBaseline, Typography, Toolbar, Box, Button, IconButton, Container, Stack, Menu, MenuList, MenuItem } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [anchorNav, setAnchorNav] = useState(null);
    const openMenu = (event) => {
        setAnchorNav(event.currentTarget);
    };
    const closeMenu = () => {
        setAnchorNav(null)
    };
    return (
        <>
            <CssBaseline />
            <AppBar position='static' color='secondary'>
                <Toolbar>
                    <div className='navbar_container'>
                        <NavLink to='/'>
                            <IconButton size="large" edge="start" sx={{ color: 'white' }} aria-label="logo">

                                <TheatersIcon />
                            </IconButton></NavLink>
                        {/* Desktop Navigation */}
                        <Typography variant='h6' component="div" sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>SEEN IT</Typography>
                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            <Stack direction='row' spacing={2}>
                                <NavLink to='/login'>
                                    <Button variant="contained" sx={{ backgroundColor: "secondary.light" }}>LOG IN</Button>
                                </NavLink>
                                <NavLink to='/signup'>
                                    <Button variant="contained" sx={{ backgroundColor: "secondary.light" }}>SIGN UP</Button>
                                </NavLink>
                                <Button variant="contained" sx={{ backgroundColor: "secondary.dark" }} onClick={() => alert("in production")}>DARK MODE</Button>
                            </Stack>
                        </Box>
                        {/* Mobile Navigation */}
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton size='large' edge="start" color='inherit' onClick={openMenu}>
                                <MenuIcon />
                            </IconButton>

                            <Menu open={Boolean(anchorNav)} onClose={closeMenu} sx={{ display: { xs: "flex", md: "none" } }}>
                                <MenuList>
                                    <MenuItem onClick={closeMenu}>SIGN IN</MenuItem>
                                    <MenuItem onClick={closeMenu}>DARK MODE</MenuItem>
                                </MenuList>
                            </Menu>
                        </Box>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar