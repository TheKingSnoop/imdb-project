import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import React, { useState } from 'react';


const DialogComponent = ({name, dialogText, handleDelete, dialogTitle}) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button onClick={() => setOpen(true)} sx={{bgcolor:"secondary.dark", color:"white", '&:hover': {
      backgroundColor: 'primary.dark'}}} size='medium'>{name}</Button>
            <Dialog aria-labelledby='dialog-title' aria-describedby='dialog-description' open={open} onClose={() => setOpen(false)}>
                <DialogTitle id='dialog-title'>
                {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {dialogText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>
                        CANCEL
                    </Button>
                    <Button autoFocus onClick={() => handleDelete() && setOpen(false)}>
                        REMOVE
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogComponent