import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { increaseCounter } from './actions';
import './styles.scss';


class Login extends Component {
  render() {
    return (
      <div className="login-form-wrapper">
        <div className="login-form">
          <form>
            <label className="form-group">
              <p>Email</p>
              <input type="email" className="form-control" placeholder="Email"/>
            </label>
            <label className="form-group">
              <p>Password</p>
              <input type="password" className="form-control" placeholder="Password"/>
            </label>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}


export default connect(
  ({ counter }) => ({ counter }),
  dispatch => ({
    // increaseCounter: count => dispatch(increaseCounter(count))
  })
)(Login);
