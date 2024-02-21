import { CardMedia, Card, Container, Tooltip, Typography} from '@mui/material';
import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CarouselComponent = ({ watchlistMovies, isDarkMode }) => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 2001 },
            items: 8
        },
        desktop: {
            breakpoint: { max: 2000, min: 1025 },
            items: 7
        },
        tablet: {
            breakpoint: { max: 1024, min: 668 },
            items: 6
        },
        mobile: {
            breakpoint: { max: 667, min: 0 },
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