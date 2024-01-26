import React, { useEffect, useState } from 'react'
import { TextField, Box, Typography, Container, Grid } from '@mui/material'
import HeroSection from '../components/heroSection/HeroSection';

import UserCard from '../components/cards/UserCard.js';
import { maxWidth } from '@mui/system';

const AllUsers = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        async function getAllUsers() {
            const response = await fetch("http://localhost:3001/auth/all")
            const data = await response.json()
            setUsers(data)
            //console.log(data)
        };
        getAllUsers();


    }, [])
    return (
        <Box>
            <HeroSection />
            <Container maxWidth='md' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <Typography variant='h2'>All Users:</Typography>
            <Grid container spacing={3} sx={{width: {md: "900px", xs: '320px'},border: 'solid red 2px', maxWidth: '100%', transform: 'translate(1.5%,10%)'}}>
                {users.map((user, index) => {
                    return <Grid key={index} item md={3} xs={6}><UserCard user={user} /></Grid>
                })}
            </Grid></Container>
        </Box>
    )
}

export default AllUsers