import React from 'react';
import styled from 'styled-components';
import { Animated } from 'react-animated-css';

const MovieImg = styled.img`
  width: 100px;
`;

const Movie = styled.div`
  width: 100px;
  margin-bottom: 10px;
`;

const Movies = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 40px auto;
`;

const MovieList = ({ movies }) => (
  <Movies>
    {movies.map((movie) => (
      <Animated animationIn="fadeIn" animationOut="bounceOutRight" isVisible key={movie.imdbID}>
        <Movie key={movie.imdbID}>
          <MovieImg src={movie.Poster} alt={movie.Title} />
          <center>{movie.Title}</center>
        </Movie>
      </Animated>
    ))}
  </Movies>
);

export default MovieList;
