import React from 'react'
import MovieCard from '../cards/MovieCard';
import {Grid, Container, Typography} from '@mui/material';

const MovieContainer = ({ API_HOST, movies, currentUser, readOnly, landingPageText, isDarkMode}) => {

    return (
        <Container sx={{width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', padding: {xs:'20px', sm:'0px 0px 30px 0px'}}} >
            <Typography variant='h5' textAlign='center' sx={{fontFamily:'Russo one', color:isDarkMode?'white': 'black'}}>{landingPageText}</Typography>
            <Grid container sx={{  minWidth: "200px", display:'flex'}}>
                {movies.map((movie, index) => {
                    return <Grid key={index} item md={3} sm={6} xs={12} >
                        <MovieCard
                        API_HOST={API_HOST}
                        currentUser={currentUser}
                        movie={movie}
                        readOnly={readOnly}
                        />
                    </Grid>
                })}
            </Grid>
            </Container>
    )
}

export default MovieContainer