import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box} from '@mui/material';

const MovieDialog = ({API_HOST, name, dialogText, handleSubmit, dialogTitle, form, movies, index, isDarkMode, movie}) => {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(false)
        handleSubmit()
    }
    return (
        <>
            <Button onClick={() => setOpen(true)} sx={{bgcolor:"primary.dark", color:"white", padding:'5px', width: {sm:'100px', xs:'70px'}, fontSize:{xs:'9px',sm:'12px'}, '&:hover': {
      backgroundColor: 'primary.main'}}} size='medium'>{name}</Button>
            <Dialog aria-labelledby='dialog-title' aria-describedby='dialog-description' open={open} onClose={() => setOpen(false)}>
                <DialogTitle id='dialog-title'>
                {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {dialogText}
                    </DialogContentText>
                </DialogContent>
                {/* {form && <FormComponent API_HOST={API_HOST} setOpen={setOpen} movies={movies} index={index} isDarkMode={isDarkMode}/>} */}
                {movie.title}
                <DialogActions>
                    {!form && <><Button onClick={() => setOpen(false)}>
                        CANCEL
                    </Button>
                    <Button autoFocus onClick={handleClick}>
                        {name}
                    </Button>
                    </>}
                </DialogActions>
            </Dialog>
        </>
    )
}

export default MovieDialog