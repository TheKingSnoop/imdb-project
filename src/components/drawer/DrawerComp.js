import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import GroupIcon from '@mui/icons-material/Group';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
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
                            <ListItemIcon sx={{alignItems:'center'}} >
                                <HomeIcon sx={{marginRight:'5px'}}/>
                                <ListItemText>HOME</ListItemText>
                            </ListItemIcon>
                        </NavLink>
                        {!currentUser ? <>
                            <NavLink to='/users'>
                                    <ListItemIcon sx={{ alignItems:'center'}}>
                                        <GroupIcon sx={{marginRight:'5px'}}/>
                                        <ListItemText>USERS</ListItemText>
                                    </ListItemIcon>
                                </NavLink>
                            <NavLink to='/login'>
                                <ListItemIcon sx={{ alignItems:'center'}}>
                                    <LoginIcon sx={{marginRight:'5px'}}/>
                                    <ListItemText>LOGIN</ListItemText>
                                </ListItemIcon>
                            </NavLink>
                            <NavLink to='/signup'>
                                <ListItemIcon sx={{ alignItems:'center'}}>
                                    <PersonAddAltIcon sx={{marginRight:'5px'}}/>
                                    <ListItemText>SIGN UP</ListItemText>
                                </ListItemIcon>
                            </NavLink>
                        </> :
                            <>
                                <NavLink to='/mymovies' >
                                    <ListItemIcon sx={{ alignItems:'center'}}>
                                        <VisibilityIcon sx={{marginRight:'5px'}}/>
                                        <ListItemText>MOVIES SEEN</ListItemText>
                                    </ListItemIcon>
                                </NavLink>
                                <NavLink to='/mywatchlist'>
                                    <ListItemIcon sx={{ alignItems:'center'}}>
                                        <PlaylistAddIcon sx={{marginRight:'5px'}}/>
                                        <ListItemText>MY WATCHLIST</ListItemText>
                                    </ListItemIcon>
                                </NavLink>

                                <NavLink to='/users'>
                                    <ListItemIcon sx={{ alignItems:'center'}}>
                                        <GroupIcon sx={{marginRight:'5px'}}/>
                                        <ListItemText>USERS</ListItemText>
                                    </ListItemIcon>
                                </NavLink>
                            </>}
                        <ListItemIcon onClick={() => setIsDarkMode(prev => !prev)} sx={{ alignItems:'center'}}>
                        {isDarkMode? <LightModeIcon sx={{marginRight:'5px'}}/> : <DarkModeIcon sx={{marginRight:'5px'}}/>}
                        
                            <ListItemText>{isDarkMode ? 'LIGHT MODE' : 'DARK MODE'}</ListItemText>
                        </ListItemIcon>
                        {currentUser && <NavLink to='/' onClick={logout}>
                            <ListItemIcon sx={{ alignItems:'center'}}>
                                <LogoutIcon sx={{marginRight:'5px'}}/>
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