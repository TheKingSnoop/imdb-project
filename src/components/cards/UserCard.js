import { Typography, Box, Card, Stack, CardMedia } from '@mui/material'
import { bgcolor } from '@mui/system';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import marioCover from '../../images/marioCover.jpeg'

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${user[0].userId}`)
  }
  return (
    <Card onClick={handleClick} sx={{ '&:hover': { cursor: 'pointer' }, padding: '30px', backgroundImage: 'linear-gradient(#9c7c1c, #E3C363)'}}>
      <Box sx={{ display: 'flex', flexWrap:'wrap-reverse', justifyContent: 'space-around', alignItems: 'center', marginBottom: '10px'}}>
        <Typography align='center' sx={{ marginTop: '10px', fontFamily: 'Russo One' }}>{user[0].username}</Typography>
        <CardMedia sx={{ borderRadius: '50%', height: '75px', width: '75px' }} component='img' image={marioCover} width='100%' />
      </Box>
      <Typography sx={{borderTop:'2px solid grey', paddingTop:'5px'}}variant='body2'gutterBottom> Fav movie: Home Alone</Typography>
      <Typography variant='body2' gutterBottom> Fav movie quote: "keep the change, you filthy animal"</Typography>
      <Typography variant='body2'> Date Joined: 14/12/2023</Typography>
    </Card>
    )
}

export default UserCard