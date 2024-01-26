import { Typography, Box, Card} from '@mui/material'
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({user}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        console.log(user[0].userId)
        navigate(`${user[0].userId}`)
    }
  return (
        <Card onClick={handleClick} sx={{transform: 'translate(-8%,0%)', width:'150px', height:'100px', padding:'10px'}}>
    <Typography align='center' sx={{width:'100%'}}>{user[0].username}</Typography>
    <Typography variant='body2'> Fav movie: Bones and All</Typography>
  </Card>)
}

export default UserCard