import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

export default class ProgressComponent extends Component {
  state = {}

  up = e => {
    if(this.state.drag) {
      this.setState({
        drag: false
      });
      this.updateValue(e);
    }
  }

  down = e => {
    this.setState({
      drag: true
    });
    this.updateValue(e);
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
    const { currentTarget: { clientWidth } } = e;
    const coordinateX = e.nativeEvent.offsetX;
    const value = (coordinateX / clientWidth) * 100;
    this.props.changeDuration(Math.round(value));
  }

  render() {
    return(
      <div>
        <ProgressBar
         onMouseUp={this.up}
         onMouseDown={this.down}
         onMouseMove={this.move}
         ref="progress"
         bsStyle="info"
         now={this.state.now}
        />
      </div>
    );
  }
}
