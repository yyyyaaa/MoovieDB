import MovieService from '../../services/movie';
import { API_KEY, BASE_API_URL } from '../../constants';

const initialState = {
  searchResults: [],
  movies: {}
};

// Action types
const FETCH_MOVIE_ABORT = 'FETCH_MOVIE_ABORT';
const FETCH_MOVIE_REQUEST = 'FETCH_MOVIE_REQUEST';
const FETCH_MOVIE_FAILURE = 'FETCH_MOVIE_FAILURE';
const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS';

const SEARCH_MOVIE_REQUEST = 'SEARCH_MOVIE_REQUEST';
const SEARCH_MOVIE_SUCCESS = 'SEARCH_MOVIE_SUCCESS';

// Action creators - SYNCHRONOUS
const abortFetchMovie = () => ({
  type: FETCH_MOVIE_ABORT,
});

const failFetchMovie = (error) => ({
  type: FETCH_MOVIE_FAILURE,
  error
});

const requestFetchMovie = () => ({
  type: FETCH_MOVIE_REQUEST,
});

const succeedFetchMovie = (movie) => ({
  type: FETCH_MOVIE_SUCCESS,
  movie
}); 

const requestSearchMovie = () => ({
  type: SEARCH_MOVIE_REQUEST,
});

const succeedSearchMovie = (searchResults) => ({
  type: SEARCH_MOVIE_SUCCESS,
  searchResults,
});

// Action creators - ASYNC
export const searchMovie = (query) => async (dispatch, getState) => {
  dispatch(requestSearchMovie());
  const searchResults = await MovieService.fetchSearchResults(query);
  dispatch(succeedSearchMovie(searchResults));
}

// Reducer 
export default function reducer(state=initialState, action={}){
  switch(action.type) {
    case SEARCH_MOVIE_REQUEST:
      return {
        ...state
      };
    case SEARCH_MOVIE_SUCCESS:
      return {
        ...state,
        searchResults: action.searchResults
      };
    default:
      return state;
  }
}

// Selectors
export const getSearchResults = (state) => {
  return state.movie.searchResults;
}
