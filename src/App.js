import './App.css';
import React from 'react';
import Navbar from './components/navbar/Navbar';
import MovieContainer from './components/movieContainer/MovieContainer';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <MovieContainer/>
    </div>
  );
}

export default App;
