import React, { useEffect } from 'react'
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";
import HeroSection from '../components/heroSection/HeroSection';
import { Typography } from '@mui/material';
import WatchListContainer from '../components/movieContainer/WatchListContainer';
import { Box, Container } from '@mui/system';

const WatchList = ({ API_HOST, movies, setMovies, currentUser, movieDescription, isDarkMode }) => {
    const cookies = new Cookies()
    const token = cookies.get('jwt')
    const user = { name: jwtDecode(token.token).username, id: jwtDecode(token.token).userId }
    const user_Id = user.id

    const getWatchList = async () => {
        const response = await fetch(`http://${API_HOST}/watchlist/getWatchList/${user_Id}`)
        const data = await response.json()
        setMovies(data)
    }
    useEffect(() => {
        getWatchList()
    }, [])

    return (
        <>
            <HeroSection />
            <Box maxWidth='1240px' sx={{ py: 6, padding: '0px' }}>
                <Typography textAlign='center' variant='h4' marginY='15px' sx={{ fontFamily: 'Russo one', color: isDarkMode ? 'white' : 'black' }}>My Watch List</Typography>
                <Container sx={{ padding: '0px' }}>
                    <WatchListContainer API_HOST={API_HOST} movies={movies} currentUser={currentUser} isDarkMode={isDarkMode} getWatchList={getWatchList} />
                </Container>
            </Box>
        </>)
}

export default WatchList