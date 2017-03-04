import React, { Component } from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const MAX_PERIOD = 30;
export default class ShareControls extends Component {
  state = {}

  changePeriod = value => {
    const [ first, second ] = value;
    if((second - first) <= MAX_PERIOD) {
      this.setState({ value });
    }
  }

  sharePart = () => {
    let start = this.props.currentTime;
    let duration = this.props.duration;
    if(this.state.value) {
      [ start, duration ] = this.state.value;
    }
    const message = this.refs.message.value;
    this.props.handler({ start, duration, message });
  }

  render() {
    const { duration, currentTime } = this.props;
    const { value } = this.state;
    const defaultValue = [
      currentTime,
      duration > (currentTime + MAX_PERIOD) ? currentTime + MAX_PERIOD: duration
    ];
    return (
      <div>
        <Range
          onChange={this.changePeriod}
          min={0}
          max={duration}
          value={value || defaultValue}
          defaultValue={defaultValue}
          step={1}
        />
        <input type='text' ref='message' placeholder='Comment' />
        <a onClick={this.sharePart}>Share</a>
      </div>
    );
  }
}
