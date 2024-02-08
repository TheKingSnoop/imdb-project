import { Typography, Box, Card, CardMedia, Avatar, Stack } from '@mui/material'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../service/movieCardService'
import shrek from '../../images/shrekAvatar.png';
import mulan from '../../images/mulanAvatar.png';
import woody from '../../images/woodyAvatar.png';
import maggie from '../../images/maggieAvatar.png';
import babyyoda from '../../images/babyyodaAvatar.png';
import wonderWoman from '../../images/wonderWomanAvatar.png';

const UserCard = ({ user }) => {
  const ukDateFormat = formatDate(user[0].date_joined);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${user[0].userId}`)
  }
  const profilePic = () => {
    if (user[0].profile_pic === "shrekAvatar") {
      return shrek
    } else if (user[0].profile_pic === "mulanAvatar") {
      return mulan
    } else if (user[0].profile_pic === "woodyAvatar") {
      return woody
    } else if (user[0].profile_pic === "babyYodaAvatar") {
      return babyyoda
    } else if (user[0].profile_pic === "maggieAvatar") {
      return maggie
    } else if (user[0].profile_pic === "wonderWomanAvatar") {
      return wonderWoman
    }
    else return null;
  }

  return (
    <Card onClick={handleClick} sx={{ height: '100%', backgroundImage: 'linear-gradient(to bottom right, #c5dffc, #6AAFF8)', '&:hover': { cursor: 'pointer' }, }}>
      <Box sx={{ padding: '5px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', backgroundImage: 'linear-gradient(to bottom right, #3d93f5, #167df3)' }}>
        <Typography align='center' sx={{fontFamily: 'Russo One' }}>{user[0].username}</Typography>
        {user[0].profile_pic ? <CardMedia sx={{ borderRadius: '50%', height: '40px', width: '40px' }} component='img' image={profilePic(user[0].profile_pic)} width='100%' /> : <Avatar sx={{ bgcolor: '#d32f2f', height: '40px', width: '40px' }} />}
      </Box>
      <Box sx={{padding: '0px 25px 10px 25px'}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography color='dimGray' variant='body2' gutterBottom>Date Joined:</Typography>
          <Typography variant='body2' gutterBottom> {ukDateFormat}</Typography>
        </Box>
        <Typography color='dimGray' variant='body2'>Favourite Movie:</Typography>
        <Typography variant='body2' gutterBottom>{user[0].fav_movie}</Typography>
        <Typography color='dimGray' variant='body2'>Favourite Movie Quote:</Typography>
        <Typography variant='body2' gutterBottom>{user[0].fav_quote === '""' ? "" :user[0].fav_quote}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography color='dimGray' variant='body2' gutterBottom>Favourite Movie Genre:</Typography>
          <Typography variant='body2' gutterBottom> {user[0].fav_genre}</Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default UserCard