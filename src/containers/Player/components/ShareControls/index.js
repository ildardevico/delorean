import React, { Component } from 'react';
import { Range } from 'rc-slider';
import { Button } from 'react-bootstrap';
import 'rc-slider/assets/index.css';
import { Input } from 'components/FormComponents';
import './styles.scss';

const MAX_PERIOD = 30;

export default class ShareControls extends Component {
  state = {}

  changePeriod = value => {
    const [ first, second ] = value;
    if((second - first) <= MAX_PERIOD) {
      this.refs.left.currentTime = first;
      this.refs.right.currentTime = second;
      this.setState({ value });
    }
  }

  componentDidMount() {
    const { duration, currentTime } = this.props;
    this.refs.left.currentTime = currentTime;
    this.refs.right.currentTime = duration;
  }

  sharePart = () => {
    let { duration } = this.props;
    const { currentTime } = this.props;
    let start = currentTime;
    duration = duration > (currentTime + MAX_PERIOD) ? currentTime + MAX_PERIOD: duration;
    if(this.state.value) {
      [ start, duration ] = this.state.value;
    }
    const message = this.refs.message.value;
    this.props.handler({ start, duration, message });
  }

  render() {
    const { duration, currentTime, back, src } = this.props;
    const { value } = this.state;
    const defaultValue = [
      currentTime,
      duration > (currentTime + MAX_PERIOD) ? currentTime + MAX_PERIOD: duration
    ];
    return (
      <div>
        <div className='share-videos-container'>
          <video className='left' ref='left'>
            <source src={src || './video/original/GoPro.mp4'} />
          </video>
          <video className='right' ref='right'>
            <source src={src || './video/original/GoPro.mp4'} />
          </video>
        </div>
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
            <Button
              style={{ marginTop: '5px' }}
              className='pull-left'
              onClick={back}>
              Back
            </Button>
            <Button
              style={{ marginTop: '5px', float: 'right' }}
              onClick={this.sharePart}
              bsStyle='info'>
              Share
            </Button>
        </div>
      </div>
    );
  }
}
