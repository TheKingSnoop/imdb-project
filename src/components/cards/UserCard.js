import { Typography, Box, Card, Stack, CardMedia, Avatar } from '@mui/material'
import { bgcolor } from '@mui/system';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../../service/movieCardService'
import marioCover from '../../images/marioCover.jpeg'
import shrek from '../../images/shrekAvatar.jpeg';
import mulan from '../../images/mulanAvatar.jpeg';
import woody from '../../images/woodyAvatar.jpeg';
import maggie from '../../images/maggieAvatar.jpeg';
import babyyoda from '../../images/babyyodaAvatar.jpeg';
import wonderWoman from '../../images/wonderWomanAvatar.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserCard = ({ user }) => {
  const ukDateFormat = formatDate(user[0].date_joined);
  console.log(user[0])
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${user[0].userId}`)
  }
  const profilePic = () => {
    if (user[0].profile_pic == "shrekAvatar") {
        return shrek
    } else if (user[0].profile_pic == "mulanAvatar") {
        return mulan
    } else if (user[0].profile_pic == "woodyAvatar") {
        return woody
    } else if (user[0].profile_pic == "babyYodaAvatar") {
        return babyyoda
    } else if (user[0].profile_pic == "maggieAvatar") {
        return maggie
    } else if (user[0].profile_pic == "wonderWomanAvatar") {
      return wonderWoman
  }
     else return null;
}

  return (
    <Card onClick={handleClick} sx={{ height:'100%','&:hover': { cursor: 'pointer' }, padding: '30px', backgroundImage: 'linear-gradient(#9c7c1c, #E3C363)'}}>
      <Box sx={{ display: 'flex', flexWrap:'wrap-reverse', justifyContent: 'space-around', alignItems: 'center', marginBottom: '10px'}}>
        <Typography align='center' sx={{ marginTop: '10px', fontFamily: 'Russo One' }}>{user[0].username}</Typography>
        {user[0].profile_pic?<CardMedia sx={{ borderRadius: '50%', height: '75px', width: '75px' }} component='img' image={profilePic(user[0].profile_pic)} width='100%'/>:<Avatar sx={{bgcolor: '#d32f2f', height: '75px', width: '75px'}}/>}
      </Box>
      <Typography sx={{borderTop:'2px solid grey', paddingTop:'5px'}}variant='body2'gutterBottom> Fav movie: {user[0].fav_movie}</Typography>
      <Typography variant='body2' gutterBottom> Fav movie quote: {user[0].fav_quote}</Typography>
      <Typography variant='body2'> Date Joined: {ukDateFormat}</Typography>
    </Card>
    )
}

export default UserCard