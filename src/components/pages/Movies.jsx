import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieList from '../movie/MovieList';
import Layout from '../Layout/Layout';
import Input from '../shared/Input';

const Home = () => {

  const [ movies, setMovies ] = useState([]);
  const [ searchedMovie, setSearchedMovie ] = useState('');

  const fetchMovies = async () => {

    const requestUrl = `https://www.omdbapi.com/?s=${searchedMovie}&apikey=${process.env.REACT_APP_API_KEY}`;

    const responseMovies = await fetch(requestUrl);

    const userCache = await caches.open('user-cache');

    userCache.put(requestUrl, responseMovies.clone());

    const newMovies = await responseMovies.json();


    setMovies(newMovies.Search || []);

  };

  useEffect(() => {

    fetchMovies();

  }, [ searchedMovie ]);


  return (
    <Layout>

      <Input
        searchedMovie={searchedMovie}
        setSearchedMovie={setSearchedMovie}
        label="Enter a movie:"
      />
      <br />
      <MovieList movies={movies} />
      <br />
      <Link to="/dynamic">Navigate to Dynamic Page</Link>

    </Layout>

  );

};

export default Home;
