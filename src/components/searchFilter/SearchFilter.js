import { TextField } from '@mui/material'
import React from 'react'

const SearchFilter = ({filterUserInput, setFilterUserInput}) => {
    
    const handleInputChange = (e) => {
        setFilterUserInput(e.target.value)
    }

    // const handleSubmit =(e) => {
    //     e.preventDefault();
    //     console.log(filterUserInput)
    // }
  return (
 
        <TextField onChange={handleInputChange} name='title' value={filterUserInput} type='text' label='filter'></TextField>

  )
}

export default SearchFilter