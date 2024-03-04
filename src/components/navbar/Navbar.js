import React from 'react';
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Box, AppBar, CssBaseline, Typography, Toolbar, Button, useMediaQuery, useTheme, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import DrawerComp from '../drawer/DrawerComp';
import MenuListComponent from '../menuList/MenuListComponent';
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
    const menuListItems = [{itemName: "Seen", navLink: '/mymovies'}, {itemName: "Watchlist", navLink: '/mywatchlist'}]
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar color='primary' height="500px" sx={{ margin: "auto"}} >
                <Box sx={{display: "flex", justifyContent: "center", textAlign: "center"}}>
                <Toolbar sx={{width:"1240px"}}>
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
                                <NavLink to='/users'>
                                    <Button variant='contained' sx={{ backgroundColor: 'primary.light'}}>users</Button>
                                </NavLink>
                                <NavLink to='/login'>
                                    <Button variant='contained' sx={{ backgroundColor: 'primary.light', marginLeft: '10px'}}>Login</Button>
                                </NavLink>
                                <NavLink to='/signup'>
                                    <Button variant='contained' sx={{ backgroundColor: 'primary.light', marginLeft: '10px' }}>Sign Up</Button>
                                </NavLink>
                                </> 
                                :
                                 <>
                                <MenuListComponent menuListItems={menuListItems} menuListName={"MY MOVIES"}/>
                                <NavLink to='/users'>
                                    <Button variant='contained' sx={{ backgroundColor: 'primary.light', marginLeft: '10px' }}>users</Button>
                                </NavLink>
                                <Button onClick={logout} variant='contained' sx={{ backgroundColor: 'primary.light', marginLeft: '10px' }}>Log out</Button>
                            </>}
                            <Button onClick={() => setIsDarkMode(prev => !prev)} variant='contained' sx={{ backgroundColor: 'primary.dark', marginLeft: '10px', '&:hover': { backgroundColor: 'primary.light' }, '&:active': { marginTop: '2px', marginBottom: '-2px', boxShadow: '0px 0px' }  }}>{isDarkMode ? <> Light Mode <LightModeIcon fontSize='small' sx={{marginLeft:'5px', color:'yellow'}}/> </>: <>Dark Mode<DarkModeIcon fontSize='small' sx={{marginLeft:'5px', color:'#333333'}}/></>}</Button>
                        </Stack>
                    </>}
                </Toolbar></Box>
            </AppBar>
        </React.Fragment>
    )
}

export default Navbar