import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../configureStore';
import SearchPage from './SearchPage';
import '../styles/App.css';

class App extends Component {
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
