import React from 'react'
import MyMoviesCard from '../cards/MyMoviesCard';
import {Grid, Container} from '@mui/material';

const MyMoviesMovieContainer = ({ readOnly, API_HOST, movies, currentUser, isDarkMode, getMyMovies}) => {

    return (
        <Container sx={{width:'100%', display:'flex', justifyContent:'center', padding: {xs:'0px 20px 20px 20px', sm:'0px 0px 30px 0px'}}} >
            <Grid container spacing={2} sx={{  minWidth: "200px", display:'flex'}}>
                {movies.map((movie, index) => {
                    return <Grid key={index} item >
                        <MyMoviesCard
                        API_HOST={API_HOST}
                        movies={movies}
                        index={index}
                        currentUser={currentUser}
                        movie={movie}
                        isDarkMode={isDarkMode}
                        readOnly={readOnly}
                        getMyMovies={getMyMovies}
                        />
                    </Grid>
                })}
            </Grid>
            </Container>
    )
}

export default MyMoviesMovieContainer