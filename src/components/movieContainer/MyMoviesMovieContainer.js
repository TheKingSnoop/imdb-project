import React from 'react'
import MyMoviesCard from '../cards/MyMoviesCard';
import {Grid, Container} from '@mui/material';

const MyMoviesMovieContainer = ({ API_HOST, movies, currentUser, isDarkMode}) => {

    return (
        <Container sx={{width:'100%', display:'flex', justifyContent:'center', padding: {xs:'20px', sm:'0px 0px 30px 0px'}}} >
            <Grid container spacing={2} sx={{  minWidth: "200px", display:'flex'}}>
                {movies.map((movie, index) => {
                    return <Grid key={index} item md={4} sm={6} xs={12} >
                        <MyMoviesCard
                        API_HOST={API_HOST}
                        movies={movies}
                        index={index}
                        currentUser={currentUser}
                        movie={movie}
                        isDarkMode={isDarkMode}
                        />
                    </Grid>
                })}
            </Grid>
            </Container>
    )
}

export default MyMoviesMovieContainer