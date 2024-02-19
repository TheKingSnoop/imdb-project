import { CardMedia, Grid, Card, Typography, Box, Rating, Stack } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { formatDate } from '../../service/movieCardService'
import DialogComponent from '../dialog/Dialog';
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

const MyMoviesCard = ({ API_HOST, movies, index, movie, isDarkMode, readOnly }) => {
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
                <Grid item xs={3} md={2} width='100%'>
                       <CardMedia component='img' image={movie.image} sx={{ objectFit: 'stretch', maxWidth:'100%' }} />
                    {movie.userReviewId && movie.userReviewId[0].isFavourite && <FavoriteIcon sx={{ position: 'absolute', top: '2px', right: '0', fontSize: '30px', color: '#ef5350'}} />} 
              
                </Grid>
                <Grid item xs={9} md={10} color='white' width='100%'>
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px' }}>
                        <Box>
                            <Stack direction='row' sx={{display:'flex', alignItems:'baseline'}}>
                            <Typography gutterBottom variant='h6' sx={{ fontFamily: 'Russo One', lineHeight: '1', marginRight:'3px', fontSize:{xs:'0.8rem', sm:'1.4rem'}}}>{movie.title}</Typography>
                            <Typography variant='h6' sx={{ fontSize:{xs:"0.7rem", sm:"0.9rem"}, color: isDarkMode? "#8f8f8f" : 'dimGrey', fontFamily:'roboto'}}>{movie.release_date.slice(0, 4)}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} sx={{ display: 'flex', alignItems:'center' }}>
                                {movie.userReviewId ? <Rating sx={{ width: 'auto' }} value={movie.userReviewId[0].user_rating} precision={0.5} size='small' readOnly /> : ''}
                                {movie.userReviewId ? <Typography variant='body2'sx={{color: isDarkMode? "#8f8f8f" : 'dimGrey', fontSize:{xs:'0.8rem', sm:'1rem'}}} paddingRight='4px'>Seen: {formatDate(movie.userReviewId[0].dateWatched)}</Typography> : ''}
                            </Stack>
                        </Box>
                        {movie.userReviewId?<Typography variant='body2'sx={{maxHeight:{xs:'40px' ,sm:'130px'}, overflowX: "hidden", fontSize:{xs:'0.7rem', sm:'1.3rem'}, fontFamily:'Acme' }}paddingY='5px'>{movie.userReviewId[0].user_analysis}</Typography>:''}
                        {!readOnly ? <Stack spacing={1} direction='row' sx={{}}>
                            <DialogComponent isDarkMode={isDarkMode} API_HOST={API_HOST} name={'REMOVE'} dialogText={`Are you sure you want to remove '${movies[index].title}' from your list of Seen It movies?`} handleSubmit={handleDelete} dialogTitle={'Remove Movie'} />
                            <DialogComponent isDarkMode={isDarkMode} API_HOST={API_HOST} name={'REVIEW'} form={true} movies={movies} index={index} />
                        </Stack>:
                        <Box sx={{height:{xs:"0px", sm:"50px"}}}></Box>}
                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}

export default MyMoviesCard