import { Box, CssBaseline, Typography, Stack, Grid, Container } from '@mui/material';
import React from 'react';
import CopyrightIcon from '@mui/icons-material/Copyright';
import GitHubIcon from '@mui/icons-material/GitHub';
import "./Footer.css";
import Link from '@mui/material/Link';;


const Footer = () => {

    return (
        <Box sx={{ bgcolor: "secondary.main", color: "white", display:'flex', justifyContent: 'center', flexDirection: 'column', border: "2px solid pink", alignItems: 'center' }}>
                <Stack spacing={2} direction='row' sx={{py:3}}>
                    <CopyrightIcon />
                    <Typography variant="body1">SEEN IT 2023</Typography>
                </Stack>
            <Container maxWidth='md' sx={{ py: 6, border:"2px solid green",  display:'flex', alignItems: "center", flexDirection: 'column'}}>
                <Grid container spacing={4} width="100%" sx={{ border: "2px solid orange"}}>
                    <Grid item xs={12} md={6} sx={{border:"2px solid purple", display: "flex", justifyContent: "center"}}>
                        <Stack spacing={2}>
                            <Link href="https://github.com/TheKingSnoop" sx={{ color: "white" }} underline="hover" target="_blank">
                                <Stack spacing={1} direction='row' sx={{ display: 'flex', alignItems: 'center'}}>
                                    <Typography variant='body2' component='left'>About Us</Typography>
                                    <GitHubIcon />
                                </Stack>
                            </Link>
                            <Typography variant='body2' component='left'>Back to Top</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{border:"2px solid purple", display: "flex", justifyContent: "center"}}>
                        <Stack spacing={2}>
                            <Typography variant='body2' component='right'>Contact Us</Typography>
                            <Typography variant='body2' component='right'>Back to Top</Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>

    )
}

export default Footer;