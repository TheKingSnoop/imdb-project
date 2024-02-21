import { CardMedia, Card, Container, Tooltip, Typography} from '@mui/material';
import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CarouselComponent = ({ watchlistMovies, isDarkMode }) => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 1024 },
            items: 7
        },
        desktop: {
            breakpoint: { max: 1024, min: 800 },
            items: 6
        },
        tablet: {
            breakpoint: { max: 800, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3
        }
    };
    return (
        <Container height={300} sx={{marginY:'10px', maxWidth:{xs:'370px', sm:'720px', md:'1050px', lg:'100%'}, padding: {sm:'0px', md:'0px 24px'}}}>
            {watchlistMovies.length > 0 ? <Carousel style={{width:'100%'}} responsive={responsive}>
            {watchlistMovies.map((movie, index) => {
                return (
                    <Card key={index} sx={{width:{xs:'90px', sm:'150px'}}}>
                        <Tooltip title={movie.title}>
                            <CardMedia component='img' image={movie.image} sx={{ objectFit: 'contain', width:'100%'}} />
                        </Tooltip>
                    </Card>
                )
            })}
        </Carousel> :
        <Typography variant='h5' sx={{ fontFamily: 'Russo One', color: isDarkMode && "white", fontSize:{xs:'16px', sm:'20px'} }}>
            No movies added in watch list</Typography>}
            
        </Container>
    )
}

export default CarouselComponent