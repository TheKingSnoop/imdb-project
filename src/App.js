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

function App() {
  const [movies, setMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const cookies = new Cookies()

  useEffect(() => {
    const user = getCurrentUser() 
      if(user) {
        setCurrentUser(user)
      } 
      console.log('currentUser', currentUser)
      
  },[]);
  
  const getCurrentUser = () => {
    const token = cookies.get('jwt')
    if(token) {
      return {name: jwtDecode(token.token).username, id: jwtDecode(token.token).userId}
    }
  }

  return (
    <ThemeProvider theme={theme}>
      
        
          <BrowserRouter>
          <Navbar currentUser= {currentUser}/>
        <body className="main">
            <Routes>
              <Route index element={<Home movies={movies} setMovies={setMovies} currentUser={currentUser}/>} />
              <Route path="/home" element={<Home movies={movies} setMovies={setMovies} currentUser={currentUser} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/mymovies" element={<MyMovies currentUser={currentUser} movies={movies} setMovies={setMovies} />} />
              <Route path="*" element={<NoPage/>}/>
            </Routes>
          </body>
          </BrowserRouter>
        <Footer />
      
    </ThemeProvider>);
}

export default App;
