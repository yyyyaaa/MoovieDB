import React from 'react';
import PropTypes from 'prop-types';

const SuggestionList = ({ movies, fetchMovie, hideSuggestions }) => (
  <ul className="suggestion">
    {movies.map(movie => (
      <li 
        key={movie.id} 
        className="suggestion-item" 
        id={movie.id}
        onClick={() => { hideSuggestions(); fetchMovie(movie.id)}}
      >
        <p>{movie.title}</p>
        <small>{movie.overview}</small>
      </li>
    ))}
  </ul>
)

SuggestionList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
  })).isRequired,
  fetchMovie: PropTypes.func.isRequired,
}

export default SuggestionList;