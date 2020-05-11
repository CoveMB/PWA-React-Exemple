import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../shared/Layout';

const Home = () => {

  const [ movies, setMovies ] = useState([]);

  const fetchMovies = async () => {

    const response = await fetch(`https://www.omdbapi.com/?s=harry%20potter&apikey=${process.env.REACT_APP_API_KEY}`);

    const newMovies = await response.json();

    setMovies(newMovies.Search);

  };

  useEffect(() => {

    fetchMovies();

  }, []);

  return (
    <Layout>

      <br />

      {movies.map((movie, index) => <p key={movie.imdbID}>{movie.Title}</p>)}

      <Link to="/dynamic">Navigate to Dynamic Page</Link>

      <br />

    </Layout>

  );

};

export default Home;
