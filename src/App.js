import './App.css';
import React from 'react';
import Navbar from './components/navbar/Navbar';
import MovieContainer from './components/movieContainer/MovieContainer';
import {createTheme, colors, ThemeProvider}  from '@mui/material'

const theme = createTheme({
    palette: {
      primary: {
        main:"#d500f9",
        light:"#dd33fa",
        dark: "#9500ae",
      },
      secondary: {
        main: "#d32f2f",
        light:"#ef5350",
        dark:"#c62828"
      }
    }
  })

function App() {

  
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Navbar/>
      <body className="main">
      <MovieContainer />
      </body>
      </div>
 </ThemeProvider> );
}

export default App;
