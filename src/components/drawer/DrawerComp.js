import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom'

const DrawerComp = ({ currentUser, logout, isDarkMode, setIsDarkMode }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    // const menuListItems = [{itemName: "Seen", navLink: '/mymovies'}, {itemName: "Watchlist", navLink: '/mywatchlist'}]
    return (
        <React.Fragment>
            <Drawer open={openDrawer} anchor='right' onClose={() => setOpenDrawer(false)}>
                <List>
                    <ListItemButton onClick={() => setOpenDrawer(false)} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <NavLink to='/home'>
                            <ListItemIcon >
                                <ListItemText>HOME</ListItemText>
                            </ListItemIcon>
                        </NavLink>
                        {!currentUser ? <>
                            <NavLink to='/users'>
                                <ListItemIcon >
                                    <ListItemText>USERS</ListItemText>
                                </ListItemIcon>
                            </NavLink>
                            <NavLink to='/login'>
                                <ListItemIcon >
                                    <ListItemText>LOGIN</ListItemText>
                                </ListItemIcon>
                            </NavLink>
                            <NavLink to='/signup'>
                                <ListItemIcon >
                                    <ListItemText>SIGN UP</ListItemText>
                                </ListItemIcon>
                            </NavLink>
                        </> :
                            <>
                                <NavLink to='/mymovies'>
                                    <ListItemIcon >
                                        <ListItemText>MOVIES SEEN</ListItemText>
                                    </ListItemIcon>
                                </NavLink>
                                <NavLink to='/mywatchlist'>
                                    <ListItemIcon >
                                        <ListItemText>MY WATCHLIST</ListItemText>
                                    </ListItemIcon>
                                </NavLink>

                                <NavLink to='/users'>
                                    <ListItemIcon >
                                        <ListItemText>USERS</ListItemText>
                                    </ListItemIcon>
                                </NavLink>
                            </>}
                        <ListItemIcon onClick={() => setIsDarkMode(prev => !prev)}>
                            <ListItemText>{isDarkMode ? 'LIGHT MODE' : 'DARK MODE'}</ListItemText>
                        </ListItemIcon>
                        {currentUser && <NavLink to='/' onClick={logout}>
                            <ListItemIcon >
                                <ListItemText>LOG OUT</ListItemText>
                            </ListItemIcon>
                        </NavLink>}
                    </ListItemButton>

                </List>
            </Drawer>
            <IconButton sx={{ color: "white", marginLeft: "auto" }} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </React.Fragment>
    )
}

export default DrawerComp