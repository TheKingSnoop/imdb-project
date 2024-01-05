import React from 'react'
import MovieCard from '../movieCard/MovieCard';
import Grid from '@mui/material/Grid';

const MovieContainer = ({ movies, currentUser, filterUserInput }) => {

    return (
            <Grid container spacing={3} sx={{ maxWidth: {md: "900px", xs: '320px'}, minWidth: "200px"}}>
                {movies.filter(movie => {
                    if(filterUserInput === "") {
                        return movie;
                    } else if(movie.title.toLowerCase().includes(filterUserInput.toLowerCase())) {
                        return movie
                    }
                }).map((movie, index) => {
                    return <Grid key={index} item md={3} >
                        <MovieCard
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
                        />
                    </Grid>
                })}
            </Grid>
    )
}

export default MovieContainer