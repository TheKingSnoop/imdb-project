import React from 'react'
import { Typography, Box, Stack, Image } from '@mui/material';
import marioCover from '../../images/marioCover.jpeg'

const HeroSection = ({ movies }) => {
    
    const bgImage = movies ? movies[0] && movies[0].image : marioCover
    return (
        <Box sx={{ width: '100vw', height: '50vh', backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${bgImage})`, backgroundSize: 'cover', position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: 'white' }}>
                <Typography variant='h3' sx={{ fontFamily: "Russo One", fontSize: { xs: '2rem', md: '4rem' } }}>
                    Seen It
                </Typography>
                <Typography variant='h4' sx={{ fontFamily: "Russo One", fontSize: { xs: '1em', md: '2rem' } }}>
                    Rate, review &amp; track movies you've seen.
                </Typography>
                <Typography variant='h4' sx={{ fontFamily: "Russo One", fontSize: { xs: '1em', md: '2rem' } }}>
                    Tell your friends about it!
                </Typography>
            </Box>
        </Box>

    )
}

export default HeroSection