import React, { Component } from 'react';
import SuggestionList from './SuggestionList';
import Magnifier from '../assets/images/search-icon.svg';

class SearchBox extends Component {
  render() {
    const mockData = [
      {
        id: "1a",
        title: "The Walking Dead",
      }, {
        id: "1ab",
        title: "The Walking Alive",
      }, {
        id: "1c",
        title: "Deadpool",
      }
    ]

    return (
      <form className="searchbox">
        <input type="text" role="search" placeholder="Search something..."/>
        <span className="searchbox-magnifier">
          <img src={Magnifier} alt="search" />
        </span>
        <SuggestionList movies={mockData}/>
      </form>
    );
  }
}

export default SearchBox;