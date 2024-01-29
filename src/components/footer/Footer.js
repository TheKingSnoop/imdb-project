import { Box, Typography, Stack, Grid, Container, BottomNavigation } from '@mui/material';
import React from 'react';
import CopyrightIcon from '@mui/icons-material/Copyright';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from '@mui/material/Link';


const Footer = () => {

    return (
        <BottomNavigation sx={{ bgcolor: "primary.main", color: "white", display:'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: 'auto'}}>
                <Stack spacing={2} direction='row'>
                    <CopyrightIcon />
                    <Typography variant="body1">SEEN IT 2024</Typography>
                </Stack>
        </BottomNavigation>

    )
}

export default Footer;