import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box, Card, CardMedia, CardContent, Typography, Stack, Grid } from '@mui/material';
import { addToSeenIt, dynamicRating, formatDate } from '../../service/movieCardService'
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Cookies from 'universal-cookie'


const MovieDialog = ({ API_HOST, dialogText, dialogTitle, movies, index, isDarkMode, movie, currentUser, setOpenWatchListSnackBar, setOpenSeenItSnackBar }) => {
    const [open, setOpen] = useState(false)
    const colourRating = dynamicRating(movie);

    const cookies = new Cookies();
    const token = cookies.get('jwt')

    const handleSubmit = (endpoint, setFunction) => {
        const movieToAdd = addToSeenIt(movie, currentUser)
        const addToMovieDatabase = async () => {
            const response = await fetch(`http://${API_HOST}/${endpoint}`, {
                method: 'POST',
                body: JSON.stringify(movieToAdd),
                headers: {
                    "Authorization": "Bearer " + token.token,
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            if (data.errors) {
                alert(data.errors[0].msg)
            } else { setFunction(true) }
        }
        addToMovieDatabase()
    }

    return (
        <>
            <Card onClick={() => setOpen(true)} sx={{ maxWidth: '130px' }}  >
                <CardMedia component='img' width='100%' image={movie.image} sx={{
                    '&:hover': {
                        cursor: 'pointer'
                    }
                }} />
            </Card>
            <Dialog aria-labelledby='dialog-title' aria-describedby='dialog-description' open={open} onClose={() => setOpen(false)}>
                <DialogTitle textAlign='center' id='dialog-title' sx={{ bgcolor: 'primary.light', color: 'white', padding:'8px' }}>
                    <Stack direction='row' sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                        <Typography variant='h6' sx={{ fontFamily: 'Russo One', marginRight: '10px' }}>{movie.title}</Typography>
                        <Typography sx={{ fontFamily: 'Russo One', color: isDarkMode ? "#8f8f8f" : 'dimGrey' }}>{movie.release_date.slice(0, 4)}</Typography>
                    </Stack>
                </DialogTitle>
                <DialogContent sx={{ bgcolor: 'primary.light', display: 'flex', padding:'0px 16px 10px 16px', flexDirection:{xs:'column', sm:'row'}, alignItems:'center' }}>
                    <Box component='img' src={movie.image} sx={{ borderRadius:'5px', width: {xs:'50%', sm:'40%'}, display: 'flex', justifyContent: 'center', marginBottom: '10px', marginRight:{xs:'0px', sm:'15px'}  }}>
                        {/* <Card sx={{ width: { xs: '150px', sm: '250px' } }}>
                            <CardMedia component='img' width='100%' image={movie.image} />
                        </Card> */}
                    </Box>
                    <DialogContentText>
                        <Typography sx={{ overflowX: "hidden", color: 'white', height: { xs: '100px', sm: 'auto' }, lineHeight: {xs:'16px',sm:'20px'}, fontSize:{xs:'14px'} }}>
                            {movie.description}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-start', gap: '10px', padding: '0' }}>
                            <StarOutlineIcon sx={{ color: colourRating }} />
                            <Typography variant='body2' sx={{ color: colourRating }}>{Math.round(movie.rating * 10) / 10}</Typography>
                        </Box>
                    </DialogContentText>

                </DialogContent>
                {currentUser && <DialogActions sx={{ bgcolor: 'primary.light', paddingTop:'0px' }}>
                    <Grid container spacing={1}>
                        <Grid item sm={4} xs={12}>
                            <Button variant='contained' autoFocus onClick={() => handleSubmit("movie/addMovie", setOpenSeenItSnackBar)} sx={{ width: '100%', '&:active': { marginTop: '2px', marginBottom: '-2px', boxShadow: '0px 0px' } }}>
                                + Seen It
                            </Button>
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <Button autoFocus variant='contained' onClick={() => handleSubmit("watchlist/addMovie", setOpenWatchListSnackBar)} sx={{ width: '100%' }}>
                                + Watchlist
                            </Button>
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <Button variant='contained' autoFocus onClick={() => setOpen(false)} sx={{ width: '100%' }}>
                                CANCEL
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>}
            </Dialog>
        </>
    )
}

export default MovieDialog