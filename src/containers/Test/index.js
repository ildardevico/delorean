import React, { Component } from 'react';
import publishVk from 'utils/publish/vk';

export default class Test extends Component {
  send() {
    // publishVk({
    //   type: 'gif',
    //   fileName: 'GoPro.mp4',
    //   start: 20,
    //   duration: 30,
    //   message: 'test post',
    //   title: 'Gif'
    // }).then(postId => console.log(`Post ID: ${postId}`));
    publishVk({
      type: 'video',
      fileName: 'GoPro.mp4',
      start: 20,
      duration: 30,
      message: 'test post video',
      title: 'Gif'
    }).then(postId => console.log(`Post ID: ${postId}`));
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