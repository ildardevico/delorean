import React, { Component } from 'react';
import Notification from 'components/Notification';
import './styles.scss';
import 'whatwg-fetch';

export default class Layout extends Component {
  render() {
    return (
      <div className="container">
        {this.props.children}
        <Notification />
      </div>
    );
  }
}
