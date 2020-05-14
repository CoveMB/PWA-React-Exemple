import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieList from '../movie/MovieList';
import Layout from '../Layout/Layout';
import Input from '../shared/Input';
import { readDb } from '../../indexDb';

const Home = () => {

  const [ movies, setMovies ] = useState([]);
  const [ searchedMovie, setSearchedMovie ] = useState('');

  const fetchMovies = async () => {

    if (searchedMovie.length > 1) {

      const requestUrl = `https://www.omdbapi.com/?s=${searchedMovie}&apikey=${process.env.REACT_APP_API_KEY}`;
      const fetchCompleted = false;

      try {

        try {

          const responseMovies = await fetch(requestUrl);

          const newMovies = await responseMovies.json();

          setMovies(newMovies.Search || []);

        } catch {

          const historySearch = await readDb('movies');

          const foundHistoric = historySearch.find((historic) => historic.movieSearch === searchedMovie);

          setMovies(foundHistoric.results || []);

        }

      } catch (error) {

        console.log(error);

      }

    }


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
