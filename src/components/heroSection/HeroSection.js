import React from 'react'
import { Typography, Box, Stack } from '@mui/material';

const HeroSection = ({ movies }) => {
    const bgImage = movies[0] && movies[0].image
    return (
        <Box sx={{ width: '100vw', height: { md: '500px', xs: '350px' }, backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Box sx={{ height: '100%', backgroundColor: 'black', opacity: '0.65', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Stack sx={{ color: 'white', }}>
                    <Typography variant='h3' sx={{fontFamily: "Russo One", fontSize: {xs: '2rem', md:'4rem'}}}>Seen It</Typography>
                    <Typography variant='h4' sx={{fontFamily: "Russo One", fontSize: {xs: '1em', md:'2rem'}}}>Rate, review &amp; track movies you've seen.</Typography>
                    <Typography variant='h4' sx={{fontFamily: "Russo One", fontSize: {xs: '1em', md:'2rem'}}}>Tell your friends about it!</Typography>
                </Stack>
            </Box>
        </Box>
    )
}

export default HeroSection