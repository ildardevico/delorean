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

    if (!this.state.value) {
      this.setState({ value });
      return;
    }

    const draggedFirst = this.state.value[0] !== first;
    const draggedSecond = !draggedFirst;

    if (second >= (first + MAX_PERIOD) && draggedSecond) {
      this.refs.left.currentTime = value[0] = second - MAX_PERIOD;
      this.refs.right.currentTime = second;
    } else if (first < (second - MAX_PERIOD) && draggedFirst) {
      this.refs.left.currentTime = first;
      this.refs.right.currentTime = value[1] = first + MAX_PERIOD;
    } else {
      this.refs.left.currentTime = first;
      this.refs.right.currentTime = second;
    }

    this.setState({ value });
  }

  componentDidMount() {
    const { duration, currentTime } = this.props;
    this.refs.left.currentTime = currentTime;
    this.refs.right.currentTime = duration > (currentTime + MAX_PERIOD) ? currentTime + MAX_PERIOD: duration;
  }

  sharePart = () => {
    const { getConfigForPart } = this;
    const { shareHandler } = this.props;
    shareHandler(getConfigForPart());
  }

  downloadPart = () => {
    const { getConfigForPart } = this;
    const { downloadHandler } = this.props;
    downloadHandler(getConfigForPart());
  }

  getConfigForPart = () => {
    let { duration } = this.props;
    const { currentTime } = this.props;
    let start = currentTime;
    duration = duration > (currentTime + MAX_PERIOD) ? currentTime + MAX_PERIOD: duration;
    if(this.state.value) {
      [ start, duration ] = this.state.value;
    }
    const message = this.refs.message.value;
    return { start, duration, message };
  }

  render() {
    const { shareType, changeShareType, duration, currentTime, back, src } = this.props;
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
        <Range
          onChange={this.changePeriod}
          min={0}
          max={duration}
          value={value || defaultValue}
          defaultValue={defaultValue}
          step={1}
        />
        <Input className='message-input' type='text' ref='message' placeholder='Comment' />
        <div className="buttons-wrapper">
          <Button
            className="back-button"
            onClick={back}
          ><i className="material-icons">arrow_back</i> Back</Button>
          <div className={`switch-wrapper ${shareType}`}>
            <span className="text text-gif">Gif</span>
            <div className="switch" onClick={changeShareType}></div>
            <span className="text text-video">Video</span>
          </div>
          <Button
            className='download-button'
            onClick={this.downloadPart}
          >Preview <i className="fa fa-eye" aria-hidden="true"></i></Button>
          <Button
            onClick={this.sharePart}
          >Share <i className="material-icons">share</i></Button>
        </div>
      </div>
    );
  }
}
