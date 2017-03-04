import React, { Component } from 'react';
import { Range } from 'rc-slider';
import { Button } from 'react-bootstrap';
import 'rc-slider/assets/index.css';
import { Input } from 'components/FormComponents';

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
    let { duration, currentTime } = this.props;
    let start = currentTime;
    duration = duration > (currentTime + MAX_PERIOD) ? currentTime + MAX_PERIOD: duration;
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
        <Input type='text' ref='message' placeholder='Comment' />
        <Button onClick={this.sharePart} bsStyle='info'>Share</Button>
      </div>
    );
  }
}
