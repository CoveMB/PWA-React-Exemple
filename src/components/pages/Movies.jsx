import React, { useState, useEffect } from 'react';
import MovieList from '../Movie/MovieList';
import Layout from '../Layout/Layout';
import SingleInputForm from '../Shared/Form/SingleInputForm';
import { readDb } from '../../service-worker/indexDb';

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

        } catch (error) {

          const historySearch = await readDb('omdbapi');

          const foundHistoric = historySearch.find((historic) => historic.id === searchedMovie);

          setMovies(foundHistoric.result || []);

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
    <Layout header="Movie Search">

      <SingleInputForm
        name="movie"
        element={searchedMovie}
        setElement={setSearchedMovie}
        label="Enter a movie:"
      />
      <br />
      <MovieList movies={movies} />
      <br />

    </Layout>

  );

};

export default Home;
