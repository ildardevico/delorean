import React, { Component } from 'react';
import './styles.scss';

export default class CustomControl extends Component {
  render() {
    const { top, icon, text, handler } = this.props;

    return (
      <div style={{ top: `${top}px` }} className="custom-control">
        <a onClick={handler}>{icon}</a>
        <p className="help">{text}</p>
      </div>
    );
  }
}
