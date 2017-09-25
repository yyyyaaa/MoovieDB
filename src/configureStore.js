import { 
  createStore, 
  applyMiddleware, 
  compose,
  combineReducers, 
} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { reducer as formReducer } from 'redux-form';
import movie from './containers/SearchPage/duck';

const logger = createLogger();
const rootReducer = combineReducers({
  movie,
  form: formReducer,
});

const composeEnhancers =
typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, logger),
  // other store enhancers if any
);

const store = createStore(
  rootReducer,
  enhancer,  
);

export default store;