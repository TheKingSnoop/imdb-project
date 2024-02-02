import './App.css';
import React, { useEffect, useState} from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import MyMovies from './pages/MyMovies';
import MyProfile from './pages/MyProfile';
import SignUp from './pages/SignUp';
import NoPage from './pages/NoPage';
import Users from './pages/Users'
import UserPage from './pages/UserPage';
import Navbar from './components/navbar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material';
import Footer from './components/footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";
import { LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import enGB from 'date-fns/locale/en-GB';

const theme = createTheme({
  palette: {
    primary: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828"
    },
    secondary: {
      main: "#ebebeb",
      light: "#ffffff",
      dark: "#d6d6d6",
    }
  }
});

const darkModeTheme = createTheme({
  palette: {
    primary: {
      main: "#1f1f1f",
      light: "#333333",
      dark: "#0a0a0a"
    },
    secondary: {
      main: "#ebebeb",
      light: "#ffffff",
      dark: "#d6d6d6",
    }
  }
});

function App() {
  const [movies, setMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [movieDescription, setMovieDescription] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false)
  const cookies = new Cookies()

const API_HOST = process.env.REACT_APP_API_HOST;
const API_PORT = process.env.REACT_APP_API_PORT;

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
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
    <ThemeProvider theme={isDarkMode? darkModeTheme: theme }>
          <BrowserRouter>
          <Navbar currentUser= {currentUser} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
        <main className= {`main ${isDarkMode? "main_darkMode" : "" }`}>
            <Routes>
              <Route index element={<Home API_HOST={API_HOST} API_PORT={API_PORT} movies={movies} setMovies={setMovies} currentUser={currentUser}  isDarkMode={isDarkMode} movieDescription={movieDescription} />} />
              <Route path="/home" element={<Home API_HOST={API_HOST} API_PORT={API_PORT} movies={movies} setMovies={setMovies} currentUser={currentUser}  isDarkMode={isDarkMode} movieDescription={movieDescription}/>} />
              <Route path="/signup" element={<SignUp API_HOST={API_HOST} API_PORT={API_PORT}/>} />
              <Route path="/login" element={<Login API_HOST={API_HOST} API_PORT={API_PORT}/>} />
              <Route path="/mymovies" element={<MyMovies API_HOST={API_HOST} API_PORT={API_PORT} currentUser={currentUser} movies={movies} setMovies={setMovies} isDarkMode={isDarkMode} movieDescription={movieDescription}/>} />
              <Route path="/myprofile" element={<MyProfile API_HOST={API_HOST} API_PORT={API_PORT} isDarkMode={isDarkMode} currentUser={currentUser}/>} />
              <Route path="/users" element={<Users API_HOST={API_HOST} API_PORT={API_PORT} isDarkMode={isDarkMode}/>} />
              <Route path="/users/:userId" element={<UserPage API_HOST={API_HOST} API_PORT={API_PORT} currentUser={currentUser} movies={movies} setMovies={setMovies} isDarkMode={isDarkMode} movieDescription={movieDescription} setMovieDescription={setMovieDescription}/>} />
              <Route path="*" element={<NoPage/>}/>
            </Routes>
          </main>
          </BrowserRouter>
        <Footer/>
    </ThemeProvider>
    </LocalizationProvider>
    );
}

export default App;
