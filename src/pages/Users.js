import React, { useEffect, useState } from 'react'
import { Box, Typography, Container, Grid } from '@mui/material'
import HeroSection from '../components/heroSection/HeroSection';
import UserCard from '../components/cards/UserCard.js';

const Users = ({API_HOST, isDarkMode}) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function getAllUsers() {
            const response = await fetch(`http://${API_HOST}/auth/all`)
            const data = await response.json()
            setUsers(data)
        };
        getAllUsers();
    },[])

    return (
        <Box>
            <HeroSection />
            <Container sx={{padding: '30px'}}>
            <Typography gutterBottom sx={{textAlign: 'center', fontFamily: 'Russo One', color: isDarkMode? "white" : ""}} variant='h4'>All Users</Typography>
            <Grid container spacing={3}>
                {users.map((user, index) => {
                    return <Grid key={index} item md={4} sm={6} xs={12}><UserCard user={user} /></Grid>
                })}
            </Grid>
            </Container>
        </Box>
    )
}

export default Users