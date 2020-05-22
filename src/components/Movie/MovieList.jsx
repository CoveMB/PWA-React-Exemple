import React from 'react';

const MovieList = (props) => {

  const { movies } = props;


  return (
    <>

      <br />

      {movies.map((movie) => <p key={movie.imdbID}>{movie.Title}</p>)}

      <br />

    </>

  );

};

export default MovieList;
