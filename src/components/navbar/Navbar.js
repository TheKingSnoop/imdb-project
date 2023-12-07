import React from 'react'
import { useState } from 'react';
import "./NavBar.css"
import TheatersIcon from '@mui/icons-material/Theaters';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, CssBaseline, Typography, Toolbar, Box, Button, IconButton, Container, Stack, Menu, MenuList, MenuItem } from '@mui/material';

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
                        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
                            <TheatersIcon />
                        </IconButton>
                        {/* Desktop Navigation */}
                        <Typography variant='h6' component="div" sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>SEEN IT</Typography>
                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            <Stack direction='row' spacing={2}>
                                <Button variant="contained" sx={{backgroundColor: "secondary.light"}}>SIGN IN</Button>
                                <Button variant="contained" sx={{backgroundColor: "secondary.dark"}}>DARK MODE</Button>
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