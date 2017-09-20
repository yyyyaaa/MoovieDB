import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SearchPage from './SearchPage';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect exact from="/" to="/search" />
          <Route exact path="/search" component={SearchPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
