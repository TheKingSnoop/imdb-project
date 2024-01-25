import React, { useEffect, useState } from 'react'
import { TextField, Box, Typography} from '@mui/material'

const AllUsers = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        async function getAllUsers() {
            const response = await fetch("http://localhost:3001/auth/all")
            const data = await response.json()
            setUsers(data)
            console.log(data)
        };
        getAllUsers();


    }, [])

    return (
        <Box>
            <Typography>hello</Typography>
            {users.map((user, index) => <Typography key={index}>{user[0].username}</Typography>)}
        </Box>
    )
}

export default AllUsers