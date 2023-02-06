import React from 'react';
import AllMovies from './components/AllMovies';
import MovieDetails from './components/MovieDetails';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<AllMovies />} />
      <Route path='/movie/:id' element={<MovieDetails />} />
    </Routes>
  );
}

export default App;
