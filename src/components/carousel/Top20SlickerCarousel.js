import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CardMedia, Typography, Card, Container, Box, Button } from '@mui/material';
import './SlickerCarousel.css'
import MovieDialog from '../dialog/MovieDialog';
import MovieCard from '../cards/MovieCard';
import SnackBarComponent from '../snackBar/SnackBarComponent';

const Top20SlickerCarousel = ({ API_HOST, movies, isDarkMode, currentUser, title }) => {
    const [openSeenItSnackBar, setOpenSeenItSnackBar] = useState(false)
    const [openWatchListSnackBar, setOpenWatchListSnackBar] = useState(false)

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4.5,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2.2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1.25,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '90%' }}>
            <Typography sx={{ color: isDarkMode ? 'white' : 'black', fontFamily: 'Russo One' }}>{title}</Typography>
            <Box sx={{ maxWidth: '100%', height: 'auto', padding: { md: '30px' } }}>
                <Slider {...settings}>
                    {movies.map((movie, index) => {
                        return (
                            <MovieCard index={index} movie={movie} isDarkMode={isDarkMode} currentUser={currentUser} API_HOST={API_HOST} setOpenWatchListSnackBar={setOpenWatchListSnackBar} setOpenSeenItSnackBar={setOpenSeenItSnackBar}/>
                        )
                    })}
                </Slider>
                <SnackBarComponent setOpen={setOpenWatchListSnackBar} open={openWatchListSnackBar} message={'Added to My Watch List. Click here to view watch list.'} path={"/mywatchlist"} />
                <SnackBarComponent setOpen={setOpenSeenItSnackBar} open={openSeenItSnackBar} message={'Added to My Movies. Click here to review now.'} path={"/myMovies"} />
            </Box>
        </Container>
    )
}

export default Top20SlickerCarousel