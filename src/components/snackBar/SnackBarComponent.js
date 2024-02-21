import React from 'react'
import { Snackbar, Box } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { useNavigate } from 'react-router-dom'

const SnackBarComponent = ({setOpen, open, message, path}) => {
    const navigate = useNavigate();
    const snackBarHandleClick = () => {
        navigate(path)
        setTimeout(() => { window.scrollTo(0, document.body.scrollHeight); }, 500)
      }
  return (
    <Snackbar
    autoHideDuration={3000}
    open={open}
    onClose={() => setOpen(false)}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }} >
    <Box bgcolor="dimGrey" paddingX='10px' height='40px' sx={{ display: 'flex', alignItems: 'center', borderRadius: '5px', '&:hover': { cursor: 'pointer' } }}>
      <DoneOutlineIcon sx={{ color: 'limeGreen', marginRight: '7px' }} />
      <h5 color='White' onClick={snackBarHandleClick}>{message}</h5>
    </Box>

  </Snackbar>
  )
}

export default SnackBarComponent