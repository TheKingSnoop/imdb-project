import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CardMedia, Typography, Card, Container, Box } from '@mui/material';
import './SlickerCarousel.css'
import MovieDialog from '../dialog/MovieDialog';

const SlickerCarousel = ({ movies }) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
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
        <Container sx={{display:'flex', justifyContent:'center', width:'90%'}}>
        <Box sx={{ maxWidth: '100%', height: 'auto', padding: {md: '30px'}}}>
            <Slider {...settings}>
                {movies.map((movie, index) => {
                    return (
                    <>
                        
                        <Card key={index} sx={{maxWidth:'130px'}}  >
                            <CardMedia component='img' width='100%' image={movie.image}/>
                            <MovieDialog movie={movie} name={movie.title}/>
                        </Card>

                    </>
                    )
                })}
            </Slider>
        </Box>
        </Container>
    )
}

export default SlickerCarousel