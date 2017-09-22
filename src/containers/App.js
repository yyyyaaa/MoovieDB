import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../configureStore';
import MovieService from '../services/movie';
import SearchPage from './SearchPage';
import '../styles/App.css';

class App extends Component {
  // componentDidMount() {
  //   MovieService.fetchSearchResults("deadpool")
  //     .then(response => {
  //       console.log(response);
  //     });
  // }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Redirect exact from="/" to="/search" />
            <Route exact path="/search" component={SearchPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
