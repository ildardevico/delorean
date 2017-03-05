import React, { Component } from 'react';
import Notification from 'components/Notification';
import './styles.scss';

export default class Layout extends Component {
  render() {
    return (
      <div>
        {this.props.children}
        <Notification />
      </div>
    );
  }
}
