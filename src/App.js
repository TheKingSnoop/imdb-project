import './App.css';
import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import MyMovies from './pages/MyMovies';
import SignUp from './pages/SignUp';
import NoPage from './pages/NoPage';
import Navbar from './components/navbar/Navbar';
import MovieContainer from './components/movieContainer/MovieContainer';
import { createTheme, colors, ThemeProvider } from '@mui/material'
import SearchBar from './components/searchBar/SearchBar';
import { useState } from 'react';
import Footer from './components/footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: "#d500f9",
      light: "#dd33fa",
      dark: "#9500ae",
    },
    secondary: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828"
    }
  }
})

function App() {
  const [movies, setMovies] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
        <body className="main">
          <BrowserRouter>
            <Routes>
              <Route index element={<Home movies={movies} setMovies={setMovies} />} />
              <Route path="/home" element={<Home movies={movies} setMovies={setMovies} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/mymovies" element={<MyMovies />} />
              <Route path="*" element={<NoPage/>}/>
            </Routes>
          </BrowserRouter>
          </body>
        <Footer />
      </div>
    </ThemeProvider>);
}

export default App;
