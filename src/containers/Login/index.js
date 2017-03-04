import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { increaseCounter } from './actions';
// import './styles.scss';


class Layout extends Component {
  render() {
    return (
      <div className="container">
        Login
      </div>
    );
  }
}


export default connect(
  ({ counter }) => ({ counter }),
  dispatch => ({
    // increaseCounter: count => dispatch(increaseCounter(count))
  })
)(Layout);
