import './App.css';
import React, { useEffect, useState} from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import MyMovies from './pages/MyMovies';
import SignUp from './pages/SignUp';
import NoPage from './pages/NoPage';
import Navbar from './components/navbar/Navbar';
import { createTheme, colors, ThemeProvider } from '@mui/material';
import Footer from './components/footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'universal-cookie'

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

function App() {
  const [movies, setMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const cookies = new Cookies()

  useEffect(() => {
    const getCurrentUser = () => {
      return cookies.get('jwt')
    }
const user = getCurrentUser();
    if(user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      
        
        <body className="main">
          <BrowserRouter>
          <Navbar currentUser= {currentUser}/>
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
      
    </ThemeProvider>);
}

export default App;
