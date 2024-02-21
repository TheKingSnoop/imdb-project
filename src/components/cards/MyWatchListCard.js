import React, {useState} from 'react'
import { CardMedia, Grid, Card, Typography, Box, Button, Stack } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { dynamicRating} from '../../service/movieCardService'
import DialogComponent from '../dialog/Dialog';
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import SnackBarComponent from '../snackBar/SnackBarComponent';

const MyWatchListCard = ({ API_HOST, movies, index, movie, isDarkMode, readOnly, currentUser, getWatchList }) => {
    const [openSeenItSnackBar, setOpenSeenItSnackBar] = useState(false)

    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('jwt')
    const colourRating = dynamicRating(movie);

    const handleDelete = () => {
        const movie_Id = movies[index]._id

        const deleteMovieFromDatabase = async () => {
            try {
              const response = await fetch(`http://${API_HOST}/watchlist/delete/${movie_Id}`, {
                method: 'DELETE',
                headers: { "Authorization": "Bearer " + token.token, "Content-Type": "application/json" }
            })
            const data = await response.json()
            console.log(data.message)
                getWatchList()  
            } catch (error) {
                console.log(error)
            }

            
    }
    deleteMovieFromDatabase()
    }

    const handleSubmit = () => {
        const addToMovieDatabase = async () => {
          const response = await fetch(`http://${API_HOST}/movie/addMovie`, {
            method: 'POST',
            body: JSON.stringify({
                user_Id: currentUser.id,
                tmdb_Id: movie.tmdb_Id,
                title: movie.title,
                description: movie.description,
                rating: movie.rating,
                image: movie.image,
                release_date: movie.release_date
            }     
            ),
            headers: {
              "Authorization": "Bearer " + token.token,
              "Content-Type": "application/json"
            }
          })
          const data = await response.json()
          if (data.errors) {
            alert(data.errors[0].msg)
          } else { setOpenSeenItSnackBar(true) }
        }
        addToMovieDatabase()
      }
    return (
        <Card>
            <Grid container bgcolor='primary.light'>
                <Grid item xs={3} md={2} width='100%'>
                    <CardMedia component='img' image={movie.image} sx={{ objectFit: 'stretch', maxWidth: '100%' }} />
                </Grid>
                <Grid item xs={9} md={10} color='white' width='100%'>
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px' }}>
                        <Box>
                            <Stack direction='row' sx={{ display: 'flex', alignItems: 'baseline' }}>
                                <Typography variant='h6' sx={{ fontFamily: 'Russo One', marginRight: '3px', fontSize: { xs: '0.8rem', sm: '1.4rem' } }}>{movie.title}</Typography>
                                <Typography variant='h6' sx={{ fontSize: { xs: "0.7rem", sm: "0.9rem" }, color: isDarkMode ? "#8f8f8f" : 'dimGrey', fontFamily: 'roboto' }}>{movie.release_date.slice(0, 4)}</Typography>
                            </Stack>
                        </Box>
                        <Box>
                            <Typography variant='body2' sx={{ height: { xs: '40px', sm: '140px', md: '120px' }, color: isDarkMode ? "#8f8f8f" : 'white', overflowX: "hidden", fontSize: { xs: '0.8rem', sm: '1rem' } }} paddingRight='4px'>{movie.description}</Typography>
                        </Box>
                        <Stack direction="row" spacing={1}>
                            <Box sx={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-start', gap: '5px'}}>
                                <StarOutlineIcon sx={{ color: colourRating, fontSize:{xs: '15px', sm:'30px'} }} />
                                <Typography variant='body2' sx={{ color: colourRating, fontSize:{xs: '11px', sm:'16px'} }}>{Math.round(movie.rating * 10) / 10}</Typography>
                            </Box>
                        </Stack>
                        {!readOnly ?
                            <Stack spacing={1} direction='row' sx={{}}>
                                <DialogComponent isDarkMode={isDarkMode} API_HOST={API_HOST} name={'REMOVE'} dialogText={`Are you sure you want to remove '${movies[index].title}' from your watchlist?`} handleSubmit={handleDelete} dialogTitle={'Remove Movie'} />
                                <Button variant='contained' onClick={handleSubmit} sx={{ backgroundColor: 'primary', marginLeft: '10px'}}>Seen It</Button>
                            </Stack> :
                            <Box sx={{ height: { xs: "0px", sm: "50px" } }}></Box>}
                    </Box>
                </Grid>
            </Grid>
            <SnackBarComponent setOpen={setOpenSeenItSnackBar} open={openSeenItSnackBar} message={'Added to My Movies. Click here to review now.'} path={"/myMovies"}/>
        </Card>
    )
}

export default MyWatchListCard