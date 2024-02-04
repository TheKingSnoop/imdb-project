import React, { useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';


const DatePickerComponent = ({userInput, setUserInput}) => {
   console.log(userInput, 'daaaate')
    return (
        <Stack spacing={4} sx={{ width: '175px' }}>
            <DatePicker
                label='Date watched'
                renderInput={(params) => <TextField {...params} />}
                value={userInput.dateWatched}
                onChange={(newValue) => {
                    setUserInput({
                      ...userInput,
                      dateWatched: newValue
                    });
                  }
                }
            />
        </Stack>
    )
}

export default DatePickerComponent