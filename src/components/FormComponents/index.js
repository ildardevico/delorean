import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';

export class Input extends Component {
  render() {
    const props = this.props;
    return (
      <div className={`input-wrapper`}>
        <FormControl {...props} />
      </div>
    );
  }
}

Input.propTypes = {
  input: React.PropTypes.object,
  meta: React.PropTypes.object
};
