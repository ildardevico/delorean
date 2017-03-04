import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import './styles.scss';


class Login extends Component {
  render() {
    const { handleSubmit } = this.props;
    console.log(this.props);
    return (
      <div className="login-form-wrapper">
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <label className="form-group">
              <p>Email</p>
              <Field className="form-control" placeholder="Email" name="email" component="input" type="text"/>
            </label>
            <label className="form-group">
              <p>Password</p>
              <Field className="form-control" placeholder="Password" name="password" component="input" type="password"/>
            </label>
            <div className="alert alert-danger align-center" role="alert">Error</div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

const loginForm = reduxForm({
  form: 'login',
  onSubmit: data => console.log(data)
})(Login);

export default connect(
  ({ form }) => ({ formState: form }),
  dispatch => ({
    // increaseCounter: count => dispatch(increaseCounter(count))
  })
)(loginForm);


