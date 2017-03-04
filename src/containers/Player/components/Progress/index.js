import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

export default class ProgressComponent extends Component {
  state = {}

  up = e => {
    this.setState({
      drag: true
    });
    this.updateValue(e);
  }

  down = e => {
    if(this.state.drag) {
      this.setState({
        drag: false
      });
      this.updateValue(e);
    }
  }

  move = e => {
    if(this.state.drag) {
      this.updateValue(e);
    }
  }

  updateNow(now) {
    this.setState({ now });
  }

  updateValue = e => {
    const { pageX, target: { offsetLeft, clientWidth } } = e;
    const coordinateX = pageX - offsetLeft;
    const value = (coordinateX / clientWidth) * 100;
    console.log(pageX, offsetLeft, clientWidth, coordinateX);
    this.props.changeDuration(Math.round(value));
    this.setState({ now: value });
  }

  render() {
    return(
      <div>
        <ProgressBar
         onMouseUp={this.up}
         onMouseDown={this.down}
         onMouseMove={this.move}
         ref='progress'
         bsStyle="info"
         now={this.state.now}
        />
      </div>
    );
  }
}
