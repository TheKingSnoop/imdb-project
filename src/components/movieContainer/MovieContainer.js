import React from 'react'
import MovieCard from '../cards/MovieCard';
import {Grid, Container} from '@mui/material';

const MovieContainer = ({ API_HOST, movies, currentUser, movieDescription, readOnly}) => {

    return (
        <Container sx={{width:'100%', display:'flex', justifyContent:'center', padding: {xs:'20px', sm:'0px 0px 30px 0px'}}} >
            <Grid container sx={{  minWidth: "200px", display:'flex'}}>
                {movies.map((movie, index) => {
                    return <Grid key={index} item md={3} sm={6} xs={12} >
                        <MovieCard
                        API_HOST={API_HOST}
                        movies={movies}
                        index={index}
                        currentUser={currentUser}
                        title={movie.title}
                        rating={movie.rating}
                        description={movie.description}
                        release_date={movie.release_date}
                        image={movie.image}
                        id={movie.tmdb_id}
                        user_rating={movie.userReviewId && movie.userReviewId[0].user_rating}
                        user_analysis={movie.userReviewId && movie.userReviewId[0].user_analysis}
                        isFavourite={movie.userReviewId && movie.userReviewId[0].isFavourite}
                        dateWatched={movie.userReviewId && movie.userReviewId[0].dateWatched}
                        movieDescription= {movieDescription}
                        readOnly={readOnly}
                        />
                    </Grid>
                })}
            </Grid>
            </Container>
    )
}

export default MovieContainer