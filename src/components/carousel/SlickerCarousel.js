import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CardMedia, Typography, Card, Container, Box } from '@mui/material';
import './SlickerCarousel.css'
import MovieDialog from '../dialog/MovieDialog';

const SlickerCarousel = ({ movies, isDarkMode, currentUser, title}) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7.5,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5.5,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3.5,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3.5,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Container sx={{ display: 'flex', flexDirection:'column', justifyContent: 'center', width: '90%'}}>
            <Typography sx={{color:isDarkMode? 'white' : 'black', fontFamily:'Russo One'}}>{title}</Typography>
            <Box sx={{ maxWidth: '100%', height: 'auto', padding: { md: '30px' } }}>
                <Slider {...settings}>
                    {movies.map((movie, index) => {
                        return (
                            <MovieDialog movie={movie} key={index} isDarkMode={isDarkMode} currentUser={currentUser}/>
                        )
                    })}
                </Slider>
            </Box>
        </Container>
    )
}

export default SlickerCarousel