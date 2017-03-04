import React, { Component } from 'react';
import './styles.scss';

export default class Layout extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
