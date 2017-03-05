import React, { Component } from 'react';
import './styles.scss';

export default class CustomControl extends Component {
  render() {
    const {
      style
    } = this.props;

    return (
      <div style={style} className="custom-control">
        <button>Icon</button>
        <p className="help">Some text</p>
      </div>
    );
  }
}
