import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import * as movieActions from './duck';
import { connect } from 'react-redux';
import SuggestionList from '../../components/SuggestionList';
import Magnifier from '../../assets/images/search-icon.svg';

class SearchBox extends Component {
  static propTypes = {
    searchMovies: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = { 
      query: '', 
      showSuggestion: false,
    };
    this.handleSearch = debounce(this.handleSearch, 350);
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value });
    if(!event.target.value) {
      this.toggleSuggestion(false);
      this.props.clearSearch();
    }
    this.handleSearch();
  }

  handleSearch = () => {
    const { query } = this.state;
    if(query) {
      this.props.searchMovie(query);
      this.toggleSuggestion(true);
    }
  }

  toggleSuggestion = (value) => {
    this.setState({showSuggestion: value});
  }

  render() {
    return (
      <form className="searchbox" onFocus={() => this.toggleSuggestion(true)}>
        <input 
          type="text" 
          role="search" 
          placeholder="Search something..." 
          onChange={this.handleChange}
        />
        <span className="searchbox-magnifier">
          <img src={Magnifier} alt="search" />
        </span>
        { this.props.searchMovies && 
          this.state.showSuggestion && 
          <SuggestionList 
            movies={this.props.searchMovies} 
            fetchMovie={this.props.fetchMovie}
            hideSuggestions={() => this.toggleSuggestion(false)}
          />
        }
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchMovies: movieActions.getSearchResults(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovie: (id) => {
      dispatch(movieActions.fetchMovie(id));
    },
    searchMovie: (query) => {
      dispatch(movieActions.searchMovie(query));
    },
    clearSearch: () => {
      dispatch(movieActions.clearSearchMovie());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);