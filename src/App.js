import './App.css';
import React from 'react';
import Navbar from './components/navbar/Navbar';
import MovieContainer from './components/movieContainer/MovieContainer';
import {createTheme, colors, ThemeProvider}  from '@mui/material'
import SearchBar from './components/searchBar/SearchBar';
import { useState } from 'react';
import Footer from './components/footer/Footer';

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
  const [movies, setMovies] = useState([]);
  
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Navbar/>
      <body className="main">
      <SearchBar  movies={movies} setMovies={setMovies}/>
      <MovieContainer movies={movies} setMovies={setMovies} />
      </body>
      <Footer/>
      </div>
 </ThemeProvider> );
}

export default App;
