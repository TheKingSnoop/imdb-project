import { CardMedia, Grid, Card, Typography, Box, Rating, Stack } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { formatDate } from '../../service/movieCardService'
import DialogComponent from '../dialog/Dialog';
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

const MyMoviesCard = ({ API_HOST, movies, index, currentUser, movie, isDarkMode }) => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('jwt')

    const handleDelete = () => {
        const movie_Id = movies[index]._id
        const review_Id = movies[index].userReviewId[0]._id

        const deleteMovieFromDatabase = async () => {
            const response = await fetch(`http://${API_HOST}/movie/my-movies/delete/${movie_Id}/${review_Id}`, {
                method: 'DELETE',
                headers: { "Authorization": "Bearer " + token.token, "Content-Type": "application/json" }
            })
            const data = await response.json()
            navigate(0);
        }
        deleteMovieFromDatabase()
    }

    return (
        <Card>
            <Grid container bgcolor='primary.light'>
                <Grid item xs={4} sx={{position:'relative'}}>
                    <CardMedia component='img' width='100%' image={movie.image} sx={{ objectFit: 'contain', maxWidth: '100%' }} />
                    {movie.userReviewId && movie.userReviewId[0].isFavourite && <FavoriteIcon sx={{ position: 'absolute', top: '8px', right: '0', fontSize: '30px', color: 'primary.light' }} />}
                </Grid>
                <Grid item xs={8} color='white'>
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px' }}>
                        <Box>
                            <Typography gutterBottom variant='h6' sx={{ fontFamily: 'Russo One', lineHeight: '1' }}>{movie.title} <span style={{ fontSize: "14px", color: "dimGrey", fontFamily:'roboto'}}>{movie.release_date.slice(0, 4)}</span></Typography>
                            <Stack direction='row' spacing={1} sx={{ display: 'flex' }}>
                                {movie.userReviewId ? <Rating sx={{ width: 'auto' }} value={movie.userReviewId[0].user_rating} precision={0.5} size='small' readOnly /> : ''}
                                {movie.userReviewId ? <Typography variant='body2' color='dimGrey' paddingRight='4px'>Seen: {formatDate(movie.userReviewId[0].dateWatched)}</Typography> : ''}
                            </Stack>
                        </Box>
                        {movie.userReviewId?<Typography variant='body2' paddingY='5px'>{movie.userReviewId[0].user_analysis}</Typography>:''}
                        <Stack spacing={1} direction='row' sx={{}}>
                            <DialogComponent sx={{}} API_HOST={API_HOST} name={'REMOVE'} dialogText={`Are you sure you want to remove '${movies[index].title}' from your list of Seen It movies?`} handleSubmit={handleDelete} dialogTitle={'Remove Movie'} />
                            <DialogComponent API_HOST={API_HOST} name={'REVIEW'} form={true} movies={movies} index={index} />
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}

export default MyMoviesCard