import React from 'react';
import { FormControl } from 'react-bootstrap';


export const Input = ({ input, meta: { touched, error }, ...restAttrs }) => {
  return <div className={`input-wrapper ${touched && error ? 'error-input' : ''}`}>
    <FormControl {...input} {...restAttrs}/>
    {touched && error && <span className="error-info">{error}</span>}
  </div>;
};

Input.propTypes = {
  input: React.PropTypes.object,
  meta: React.PropTypes.object
};
