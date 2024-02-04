import React, { useEffect, useState } from 'react'
import { Box, Typography, Container, Grid } from '@mui/material'
import HeroSection from '../components/heroSection/HeroSection';
import Cookies from 'universal-cookie'
import UserCard from '../components/cards/UserCard.js';

const Users = ({API_HOST, API_PORT, isDarkMode}) => {
    const [users, setUsers] = useState([]);
    const cookies = new Cookies()
    useEffect(() => {
        async function getAllUsers() {
            const response = await fetch(`http://${API_HOST}:${API_PORT}/auth/all`)
            const data = await response.json()
            setUsers(data)
            console.log(data)
        };
        getAllUsers();


    }, [])
    return (
        <Box>
            <HeroSection />
            <Container sx={{padding: '30px'}}>
            <Typography gutterBottom sx={{textAlign: 'center', fontFamily: 'Russo One', color: isDarkMode? "white" : ""}} variant='h4'>All Users</Typography>
            <Grid container spacing={3}>
                {users.map((user, index) => {
                    return <Grid key={index} item md={4} sm={4} xs={12}><UserCard user={user} /></Grid>
                })}
            </Grid>
            </Container>
        </Box>
    )
}

export default Users