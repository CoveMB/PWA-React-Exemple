import React from 'react';

const MovieList = ({ movies }) => (
  <>

    <br />

    {movies.map((movie) => <p key={movie.imdbID}>{movie.Title}</p>)}

    <br />

  </>

);

export default MovieList;
