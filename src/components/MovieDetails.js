import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';

const API_URL = `https://api.themoviedb.org/3/movie/{movie_id}?api_key=${process.env.REACT_APP_API_KEY}`;

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL.replace('{movie_id}', id));
        setMovie(res.data);
      } catch (e) {
        setError(e.message);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <h1 className='moviename'>{movie.title}</h1>
      <img
        className='posterimage'
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title}
      />
      {error && <p>An error occurred: {error}</p>}
      <p className='movieoverview'>Overview: {movie.overview}</p>
      {movie.genres && (
        <p>Genres: {movie.genres.map((genre) => genre.name).join(', ')}</p>
      )}
      {movie.production_companies && (
        <p className='productioncompanies'>
          Production Companies:
          {movie.production_companies.map((company) => company.name).join(', ')}
        </p>
      )}
    </div>
  );
}

export default MovieDetails;
