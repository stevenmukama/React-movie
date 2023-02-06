import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import './AllMovies.css';

const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`;
const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query`;

function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [AllMovies, setAllMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL);
        const { results } = res.data;
        setMovies(results);
        setAllMovies(results);
      } catch (e) {
        setError(e.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!query) return setMovies(AllMovies);
    const search = async () => {
      try {
        const res = await axios.get(`${API_SEARCH}=${query}`);
        const { results } = res.data;
        setMovies(results);
      } catch (e) {
        setError(e.message);
      }
    };
    search();
  }, [query, AllMovies]);

  const handleSearchMovie = (e) => {
    setQuery(e.target.value);
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = movies.slice(firstPostIndex, lastPostIndex);

  return (
    <div className='allmovies'>
      <h1 className='searchmovie'>Search Movies and TV Shows</h1>
      <form autoComplete='off' className='formpart'>
        <input
          type='text'
          value={query}
          onChange={handleSearchMovie}
          placeholder='Movie Search'
          className='inputfield'
        />
      </form>
      {error && <p>An error occurred: {error}</p>}
      {movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        currentPosts.map((movie) => (
          <div key={movie.id} className='moviessection'>
            <h3 className='movietitle'>Title:{movie.title}</h3>
            <p className='releasedate'>Release date:{movie.release_date}</p>
            <p className='voteaverage'>Vote:{movie.vote_average}</p>
            <Link to={`/movie/${movie.id}`} target='_blank'>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className='movieimage'
              />
            </Link>
          </div>
        ))
      )}
      <Pagination
        totalPosts={movies.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default AllMovies;
