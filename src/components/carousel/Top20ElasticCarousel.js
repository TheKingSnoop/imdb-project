import React, { useState } from 'react';
import Carousel from 'react-elastic-carousel'
import { CardMedia, Typography, Card, Container, Box, Button } from '@mui/material';
import './Top20ElasticCarousel.css'
import MovieDialog from '../dialog/MovieDialog';
import MovieCard from '../cards/MovieCard';
import SnackBarComponent from '../snackBar/SnackBarComponent';

const Top20ElasticCarousel = ({ API_HOST, movies, isDarkMode, currentUser, title }) => {
    const [openSeenItSnackBar, setOpenSeenItSnackBar] = useState(false)
    const [openWatchListSnackBar, setOpenWatchListSnackBar] = useState(false)

    const breakPoints = [
        {width:1, itemsToShow: 1},
        {width:400, itemsToShow: 3.5, itemsToScroll: 3},
        {width:1024, itemsToShow: 4.5, itemsToScroll: 4},
    ]


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', paddingX:{xs:'10px', md:'0px'} }}>
            <Typography sx={{ color: isDarkMode ? 'white' : 'black', fontFamily: 'Russo One', marginLeft:{xs:'20px', sm:'25px', md:'70px'} }}>{title}</Typography>
            <Box sx={{ maxWidth: '100%', height: 'auto',  }}>
                <Carousel breakPoints={breakPoints}>
                    {movies.map((movie, index) => {
                        return (
                            <MovieCard key={index} movie={movie} isDarkMode={isDarkMode} currentUser={currentUser} API_HOST={API_HOST} setOpenWatchListSnackBar={setOpenWatchListSnackBar} setOpenSeenItSnackBar={setOpenSeenItSnackBar}/>
                        )
                    })}
                </Carousel>
                <SnackBarComponent setOpen={setOpenWatchListSnackBar} open={openWatchListSnackBar} message={'Added to My Watchlist. Click here to view Watchlist.'} path={"/mywatchlist"} />
                <SnackBarComponent setOpen={setOpenSeenItSnackBar} open={openSeenItSnackBar} message={'Added to My Movies. Click here to review now.'} path={"/myMovies"} />
            </Box>
        </Box>
    )
}

export default Top20ElasticCarousel