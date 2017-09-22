import axios from 'axios';
import _ from 'lodash';
import { API_KEY } from '../constants';

class MovieService {
  constructor() {
    this.BASE_API_URL = 'https://api.themoviedb.org/3';
  }

  callApi = async (endpoint) => {
    const fullUrl = (endpoint.indexOf(this.BASE_API_URL) === -1) ? this.BASE_API_URL + endpoint : endpoint;
    try {
      const response = await axios.get(fullUrl);
      if(response.status !== 200) {
        throw new Error(`MovieService error: ${response.statusText}`);
      }
      return response;
    } catch(error) {
      console.error(error);
      throw new Error(`MovieService error: ${error}`);
    }
  }

  fetchMovieById = async (id) => {
    const endpoint = `${this.BASE_API_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`;
    const movieResult = await this.callApi(endpoint);
    return movieResult;
  }

  fetchSearchResults = async (query) => {
    const endpoint = `${this.BASE_API_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=true&query=${query}`;
    const searchResult = await this.callApi(endpoint);
    const sortedByVote = _.orderBy(searchResult.data.results, 'vote_count', 'desc');
    return _.map(sortedByVote, (movie) => {
      return {
        id: movie.id,
        title: movie.original_title,
        overview: this.truncateText(movie.overview, 100),
      }
    })
  }
  
  truncateText = (text, length) => {
    if(text.length > length) {
      return text.substring(0, length) + '...';
    } else {
      return text;
    }
  }

}

export default new MovieService();