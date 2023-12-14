import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieCard from '../movieCard/MovieCard';
import Grid from '@mui/material/Grid';

const MovieContainer = ({ movies, setMovies }) => {

    useEffect(() => {
        async function getTop20Movies() {
            const response = await fetch("http://localhost:3001/tmdb");
            const data = await response.json();
            //console.log('data', data);
            setMovies(data.payload);
        };
        getTop20Movies();
    }, [])
    console.log(movies);
    return (
        <>
            <Grid container spacing={3} sx={{ maxWidth: {md: "900px", xs: '320px'}, minWidth: "200px"}}>
                {movies.map(movie => {
                    return <Grid item md={3} >
                        <MovieCard title={movie.title} rating={movie.rating} description={movie.description} release_date={movie.release_date} image={movie.image} />
                    </Grid>
                })}
            </Grid>

        </>
    )
}

export default MovieContainer