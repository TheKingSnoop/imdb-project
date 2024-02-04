import { Typography, Stack, Box} from '@mui/material';
import React from 'react';
import CopyrightIcon from '@mui/icons-material/Copyright';

const Footer = () => {

    return (
        <Box sx={{ padding:'10px 0', bgcolor: "primary.main", color: "white", display:'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: 'auto'}}>
                <Stack spacing={2} direction='row'>
                    <CopyrightIcon />
                    <Typography variant="body1">SEEN IT 2024</Typography>
                </Stack>
        </Box>
    )
}

export default Footer;