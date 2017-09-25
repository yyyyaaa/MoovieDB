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
    this.handleSearch();
  }

  handleSearch = () => {
    const { query } = this.state;
    this.props.dispatch(movieActions.searchMovie(query));
    this.toggleSuggestion(true);
  }

  toggleSuggestion = (value) => {
    this.setState({showSuggestion: value});
  }

  render() {
    return (
      <form className="searchbox" 
        onBlur={() => this.toggleSuggestion(false)}
        onFocus={() => this.toggleSuggestion(true)}
      >
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
          <SuggestionList movies={this.props.searchMovies}/>
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

export default connect(mapStateToProps)(SearchBox);