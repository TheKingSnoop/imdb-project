import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from '@mui/material';
import React, { useState } from 'react';
import FormComponent from '../form/FormComponent';


const DialogComponent = ({name, dialogText, handleSubmit, dialogTitle, form, movies, index}) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button onClick={() => setOpen(true)} sx={{bgcolor:"primary.dark", color:"white", width: '100px', '&:hover': {
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
                {form && <FormComponent setOpen={setOpen} movies={movies} index={index}/>}
                <DialogActions>
                    {!form && <><Button onClick={() => setOpen(false)}>
                        CANCEL
                    </Button>
                    <Button autoFocus onClick={() => handleSubmit() && setOpen(false)}>
                        {name}
                    </Button>
                    </>}
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogComponent