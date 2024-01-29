import React, { useEffect, useState } from 'react'
import { TextField, Box, Typography, Container, Grid } from '@mui/material'
import HeroSection from '../components/heroSection/HeroSection';
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";
import UserCard from '../components/cards/UserCard.js';
import { maxWidth } from '@mui/system';

const Users = ({isDarkMode}) => {
    const [users, setUsers] = useState([]);
    const cookies = new Cookies()
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
            <Container sx={{padding: '30px'}}>
            <Typography gutterBottom sx={{textAlign: 'center', fontFamily: 'Russo One', color: isDarkMode? "white" : ""}} variant='h4'>All Users</Typography>
            <Grid container spacing={3}>
                {users.map((user, index) => {
                    return <Grid key={index} item md={3} sm={4} xs={6}><UserCard user={user} /></Grid>
                })}
            </Grid>
            </Container>
        </Box>
    )
}

export default Users