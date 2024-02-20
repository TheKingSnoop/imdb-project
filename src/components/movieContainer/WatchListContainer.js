import React from 'react'
import {Grid, Container} from '@mui/material';
import MyWatchListCard from '../cards/MyWatchListCard';
const WatchListContainer = ({API_HOST, currentUser, isDarkMode, movies, readOnly}) => {
  return (
    <Container sx={{width:'100%', display:'flex', justifyContent:'center', padding: {xs:'0px 20px 20px 20px', sm:'0px 0px 30px 0px'}}} >
            <Grid container spacing={2} sx={{  minWidth: "200px", display:'flex'}}>
                {movies.map((movie, index) => {
                    return <Grid key={index} item >
                        <MyWatchListCard
                        API_HOST={API_HOST}
                        movies={movies}
                        index={index}
                        currentUser={currentUser}
                        movie={movie}
                        isDarkMode={isDarkMode}
                        readOnly={readOnly}
                        />
                    </Grid>
                })}
            </Grid>
            </Container>
  )
}

export default WatchListContainer