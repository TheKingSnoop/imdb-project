import React from 'react'
import { Typography, Box, Stack, Image } from '@mui/material';
import marioCover from '../../images/marioCover.png'

const HeroSection = ({ movies }) => {

    const bgImage = movies ? movies[0] && movies[0].image : marioCover
    return (
        <Box sx={{ width: '100vw', height: '50vh', backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${bgImage})`, backgroundSize: 'cover', position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: 'white' }}>
                <Typography variant='h4' sx={{ fontFamily: "Russo One", fontSize: { xs: '1em', md: '2rem' } }}>
                    Lights, Camera, Interaction:
                </Typography>
                <Typography variant='h3' sx={{ maxWidth:'270px', fontFamily: "Russo One", background: `linear-gradient(to right, #926228, #C6AA66, #926228)`,WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent", fontSize: { xs: '2rem', md: '4rem' } }}>
                    Seen It,
                </Typography>
                <Typography variant='h4' sx={{ fontFamily: "Russo One", fontSize: { xs: '1em', md: '2rem' } }}>
                    Uniting Movie Lovers, One Review at a Time.
                </Typography>

            </Box>
        </Box>

    )
}

export default HeroSection