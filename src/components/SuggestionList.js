import React from 'react';
import PropTypes from 'prop-types';

const SuggestionList = (props) => (
  <ul className="suggestion">
    {props.movies.map(movie => (
      <li key={movie.id} className="suggestion-item">{movie.title}</li>
    ))}
  </ul>
)

SuggestionList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
}

export default SuggestionList;