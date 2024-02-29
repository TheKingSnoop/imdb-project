import React, { useState } from 'react';
import Carousel from 'react-elastic-carousel'
import {Typography, Box } from '@mui/material';
import MovieDialog from '../dialog/MovieDialog';
import SnackBarComponent from '../snackBar/SnackBarComponent';

const ElasticCarousel = ({ movies, isDarkMode, currentUser, title, API_HOST}) => {
    const [openSeenItSnackBar, setOpenSeenItSnackBar] = useState(false);
    const [openWatchListSnackBar, setOpenWatchListSnackBar] = useState(false);

    const breakPoints = [
        {width:1, itemsToShow: 2.25},
        {width:400, itemsToShow: 5.5, itemsToScroll: 5},
        {width:1024, itemsToShow: 7.5, itemsToScroll: 7},
    ]

    return (
        <Box sx={{ display: 'flex', flexDirection:'column', justifyContent: 'center', width: '100%', paddingX:{xs:'10px', md:'63px'}}}>
            <Typography sx={{marginY:'10px', color:isDarkMode? 'white' : 'black', fontFamily:'Russo One', marginLeft:{xs:'20px', md:'70px'} }}>{title}</Typography>
            <Box sx={{ maxWidth: '100%', height: 'auto',  }}>
                <Carousel breakPoints={breakPoints}>
                    {movies.map((movie, index) => {
                        return (
                            <MovieDialog movie={movie} key={index} API_HOST={API_HOST} isDarkMode={isDarkMode} currentUser={currentUser} setOpenWatchListSnackBar={setOpenWatchListSnackBar} setOpenSeenItSnackBar={setOpenSeenItSnackBar}/>
                        )
                    })}
                </Carousel>
                <SnackBarComponent setOpen={setOpenWatchListSnackBar} open={openWatchListSnackBar} message={'Added to My Watchlist. Click here to view Watchlist.'} path={"/mywatchlist"} />
                <SnackBarComponent setOpen={setOpenSeenItSnackBar} open={openSeenItSnackBar} message={'Added to My Movies. Click here to review now.'} path={"/myMovies"} />
            </Box>
        </Box>
    )
}

export default ElasticCarousel