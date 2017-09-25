import { has } from 'lodash';
import MovieService from '../../services/movie';

const initialState = {
  searchResults: [],
  cache: {},
  currentMovie: {},
  error: {},
};

// Action types
const FETCH_MOVIE_ABORT = 'FETCH_MOVIE_ABORT';
const FETCH_MOVIE_REQUEST = 'FETCH_MOVIE_REQUEST';
const FETCH_MOVIE_FAILURE = 'FETCH_MOVIE_FAILURE';
const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS';

const SEARCH_MOVIE_CLEAR = 'SEARCH_MOVIE_CLEAR';
const SEARCH_MOVIE_REQUEST = 'SEARCH_MOVIE_REQUEST';
const SEARCH_MOVIE_SUCCESS = 'SEARCH_MOVIE_SUCCESS';

// Action creators - SYNCHRONOUS
export const abortFetchMovie = () => ({
  type: FETCH_MOVIE_ABORT,
});

export const failFetchMovie = (error) => ({
  type: FETCH_MOVIE_FAILURE,
  error
});

export const requestFetchMovie = () => ({
  type: FETCH_MOVIE_REQUEST,
});

export const succeedFetchMovie = (movie) => ({
  type: FETCH_MOVIE_SUCCESS,
  movie
}); 

export const clearSearchMovie = () => ({
  type: SEARCH_MOVIE_CLEAR,
});

export const requestSearchMovie = () => ({
  type: SEARCH_MOVIE_REQUEST,
});

export const succeedSearchMovie = (searchResults) => ({
  type: SEARCH_MOVIE_SUCCESS,
  searchResults,
});

// Thunk - ASYNC
export const searchMovie = (query) => async (dispatch, getState) => {
  dispatch(requestSearchMovie());
  const searchResults = await MovieService.fetchSearchResults(query);
  dispatch(succeedSearchMovie(searchResults));
}

export const fetchMovie = (id) => async (dispatch, getState) => {
  const currentState = getState();
  dispatch(requestFetchMovie());

  // Alreay in cache
  if(has(currentState.movie.cache, String(id))) {
    dispatch(abortFetchMovie());
    return;
  }
  
  const fetchedMovie = await MovieService.fetchMovieById(id);
  if(fetchedMovie.status !== 200 && !currentState.movie.currentMovie) {
    dispatch(failFetchMovie({ 
      status: fetchedMovie.status,
      statusText: fetchedMovie.statusText,
    }));
  }
  dispatch(succeedFetchMovie(fetchedMovie));
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
    case SEARCH_MOVIE_CLEAR:
      return {
        ...state,
        searchResults: []
      };
    case FETCH_MOVIE_FAILURE:
      return {
        ...state,
        error: {
          status: action.error.status,
          message: action.error.statusText,
        }
      };
    case FETCH_MOVIE_SUCCESS:
      return {
        ...state,
        cache: {
          ...state.cache,
          [action.movie.data.id]: action.movie,
        },
        currentMovie: action.movie,
      }
    case FETCH_MOVIE_REQUEST:
    case FETCH_MOVIE_ABORT:
    default:
      return state;
  }
}

// Selectors
export const getSearchResults = (state) => {
  return state.movie.searchResults;
}
