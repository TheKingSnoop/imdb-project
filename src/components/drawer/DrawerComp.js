import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom'

const DrawerComp = ({currentUser}) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const PAGES = [{ button: "LOGIN", link: "/login" }, { button: "SIGN UP", link: "/signup" }, { button: "DARK MODE" }, {
        button: "LOG OUT", link:"/", currentUser: currentUser
    }];
    return (
        <React.Fragment>
            <Drawer open={openDrawer} anchor='right' onClose={() => setOpenDrawer(false)}>
                <List>
                    {PAGES.map((page, index) => {
                        return (
                            <ListItemButton key={index} onClick={() => setOpenDrawer(false)}>
                                {currentUser&&<NavLink to={page.link}>
                                    <ListItemIcon >
                                        <ListItemText>{page.button}</ListItemText>
                                    </ListItemIcon></NavLink>}
                                
                            </ListItemButton>)
                    })}

                </List>
            </Drawer>
            <IconButton sx={{ color: "white", marginLeft: "auto" }} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </React.Fragment>
    )
}

export default DrawerComp