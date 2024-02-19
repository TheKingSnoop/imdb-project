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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MovieIcon from '@mui/icons-material/Movie';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';

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
      <Box sx={{ padding: '5px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', marginBottom: '10px', backgroundImage: 'linear-gradient(to bottom right, #3d93f5, #167df3)' }}>
        <Typography align='center' sx={{ fontFamily: 'Russo One', zIndex: '1' }}>{user[0].username}</Typography>
        {user[0].profile_pic ? <CardMedia sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-20%)', border: '2px solid #3d93f5', borderRadius: '50%', height: '70px', width: '70px' }} component='img' image={profilePic(user[0].profile_pic)} width='100%' /> : <Avatar sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-20%)', border: '2px solid #3d93f5', borderRadius: '50%', height: '70px', width: '70px', bgcolor: '#d32f2f' }} />}
      </Box>
      <Box sx={{ padding: '0px 10px 10px 10px' }}>
        <Box marginBottom='5px' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarMonthIcon fontSize='small'/>
            <Typography color='dimGray'  variant='body2' sx={{ fontFamily: 'Acme' }}>Date Joined:</Typography>
          </Box>
          <Typography variant='body2' gutterBottom sx={{ fontFamily: 'Acme' }}> {ukDateFormat}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MovieIcon fontSize='small'/>
          <Typography color='dimGray' variant='body2' sx={{ fontFamily: 'Acme' }}>Favourite Movie:</Typography>
        </Box>
        <Typography variant='body2' marginLeft='24px' gutterBottom sx={{ fontFamily: 'Acme' }}>{user[0].fav_movie}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormatQuoteIcon fontSize='small' />
          <Typography color='dimGray' variant='body2' sx={{ fontFamily: 'Acme' }}>Favourite Movie Quote:</Typography>
        </Box>
        <Typography variant='body2' marginLeft='24px' gutterBottom sx={{ fontFamily: 'Acme' }}>{user[0].fav_quote === '""' ? "" : user[0].fav_quote}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TheaterComedyIcon fontSize='small'/>
            <Typography color='dimGray' variant='body2' gutterBottom sx={{ fontFamily: 'Acme' }}>Favourite Movie Genre:</Typography>
          </Box>
          <Typography variant='body2' gutterBottom sx={{ fontFamily: 'Acme' }}> {user[0].fav_genre}</Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default UserCard