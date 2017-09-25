import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../../components/Card';

class MovieContainer extends Component {
  render() {
    return (
      <Card data={this.props.data} />
    )
  }
}

export default MovieContainer;