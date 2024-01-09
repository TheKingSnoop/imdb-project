import './App.css';
import React, { useEffect, useState} from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import MyMovies from './pages/MyMovies';
import SignUp from './pages/SignUp';
import NoPage from './pages/NoPage';
import Navbar from './components/navbar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material';
import Footer from './components/footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";

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
});

const darkModeTheme = createTheme({
  palette: {
    primary: {
      main: "#1f1f1f",
      light: "#333333",
      dark: "#0a0a0a",
    },
    secondary: {
      main: "#1f1f1f",
      light: "#333333",
      dark: "#0a0a0a"
    }
  }
});

function App() {
  const [movies, setMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [movieDescription, setMovieDescription] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false)
  const cookies = new Cookies()

  useEffect(() => {
    const user = getCurrentUser() 
      if(user) {
        setCurrentUser(user)
      } 
      //console.log('currentUser', currentUser)
      
  },[]);
  
  const getCurrentUser = () => {
    const token = cookies.get('jwt')
    if(token) {
      return {name: jwtDecode(token.token).username, id: jwtDecode(token.token).userId}
    }
  }

  return (
    <ThemeProvider theme={isDarkMode? darkModeTheme: theme }>
          <BrowserRouter>
          <Navbar currentUser= {currentUser} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
        <main className= {`main ${isDarkMode? "main_darkMode" : "" }`}>
            <Routes>
              <Route index element={<Home movies={movies} setMovies={setMovies} currentUser={currentUser} movieDescription={movieDescription} setMovieDescription={setMovieDescription}/>} />
              <Route path="/home" element={<Home movies={movies} setMovies={setMovies} currentUser={currentUser} movieDescription={movieDescription} setMovieDescription={setMovieDescription}/>} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/mymovies" element={<MyMovies currentUser={currentUser} movies={movies} setMovies={setMovies}  movieDescription={movieDescription} setMovieDescription={setMovieDescription}/>} />
              <Route path="*" element={<NoPage/>}/>
            </Routes>
          </main>
          </BrowserRouter>
        <Footer />
      
    </ThemeProvider>);
}

export default App;
