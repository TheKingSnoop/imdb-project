import './App.css';
import React from 'react';
import Navbar from './components/navbar/Navbar';
import MovieContainer from './components/movieContainer/MovieContainer';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <body className="main">
      <MovieContainer />
      </body>
    </div>
  );
}

export default App;
