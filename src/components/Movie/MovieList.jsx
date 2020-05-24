import React from 'react';
import styled from 'styled-components';

export const MovieImg = styled.img`
  width: 100px;
`;

export const Movie = styled.div`
  width: 100px;
  margin-bottom: 10px;
`;

export const Movies = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: auto;
`;

const MovieList = ({ movies }) => (
  <Movies>

    {movies.map((movie) => (
      <Movie key={movie.imdbID}>
        <MovieImg src={movie.Poster} alt={movie.Title} />
        <center>{movie.Title}</center>
      </Movie>
    ))}

  </Movies>

);

export default MovieList;
