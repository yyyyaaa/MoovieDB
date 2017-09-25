import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as movieActions from './duck';
import Card from '../../components/Card';
import Layout from '../../components/Layout';

class SearchPage extends Component {
  componentWillMount() {
    this.props.fetchMovie(293660);
  }

  render() {
    return (
      <Layout>
        { this.props.currentMovie &&
          <Card data={this.props.currentMovie} />
        }
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentMovie: state.movie.currentMovie.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovie: (id) => {
      dispatch(movieActions.fetchMovie(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);