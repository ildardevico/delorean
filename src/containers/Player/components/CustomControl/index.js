import React, { Component } from 'react';
import './styles.scss';

export default class CustomControl extends Component {
  render() {
    const { top, icon, text, handler } = this.props;

    return (
      <div style={{ top }} className="custom-control">
        <button onClick={handler}>{icon}</button>
        <p className="help">{text}</p>
      </div>
    );
  }
}
