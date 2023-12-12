import { Margin, Padding } from '@mui/icons-material';
import { AppBar, BottomNavigation, Box, CssBaseline, Toolbar, Typography, Stack } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import CopyrightIcon from '@mui/icons-material/Copyright';
import GitHubIcon from '@mui/icons-material/GitHub';
import "./Footer.css";
import Link from '@mui/material/Link';;


const Footer = () => {

    return (
        <>
            <CssBaseline />

            <BottomNavigation sx={{ bgcolor: "secondary.main", color: "white", padding: "80px 0px" }}>
                <div className='footer_container'><CopyrightIcon />
                <Stack spacing={6} direction="row">
                    <Typography variant="h6">- Seen It 2023</Typography>
                    <Box>
                        
                <Link href="https://github.com/TheKingSnoop" sx={{color: "white"}} underline="hover" target="_blank">
                About Us
                <GitHubIcon/>
                </Link>
            </Box></Stack></div>
            </BottomNavigation>
            

        </>
    )
}

export default Footer;