import React , {useState} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ToggleButton from '@mui/material/ToggleButton';
import {Box} from '@mui/material'

export default function StandaloneToggleButton({userInput, setUserInput}) {

  return (
      <Box sx={{width: "auto"}}>
      <ToggleButton
      value="check"
      selected={userInput.isFavourite}
      onChange={() => {
          setUserInput({
            ...userInput,
            isFavourite: !userInput.isFavourite
          });
        }}
        >
      {userInput.isFavourite?<FavoriteIcon color='primary' />:<FavoriteIcon/>}
    </ToggleButton></Box>
  );
}
