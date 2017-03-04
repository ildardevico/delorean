import React, { Component } from 'react';
import publishVk from 'utils/publish/vk';

export default class Test extends Component {
  send() {
    publishVk({
      type: 'gif',
      fileName: 'GoPro.mp4',
      start: 20,
      duration: 10
    });
  }

  render() {
    return (
      <div>
        <h1>Test component</h1>
        <a onClick={this.send.bind(this)}>Send</a>
      </div>
    );
  }
}