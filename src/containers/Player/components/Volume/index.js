import React, { Component } from 'react';
import './styles.scss';

class VolumeSlider extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      volume: 100
    };
  }

  handleOnChange = ({ target }) => {
    this.setState({
      volume: target.value
    });
    this.props.handler(target.value);
  }

  over = () => {
    this.setState({ width: '100%' });
  }

  out = () => {
    this.setState({ width: false });
  }

  render() {
    const { volume } = this.state;
    const { mute, muted } = this.props;
    return (
      <span className='volumerange' onMouseLeave={this.out}>
        <i
          onMouseOver={this.over}
          onClick={mute}
          className="material-icons">
            {!muted ? 'volume_up': 'volume_off'}
        </i>
        <input
         style={{ width: this.state.width || '0%', opacity: this.state.width ? '1': '0' }}
         onChange={this.handleOnChange}
         min="0"
         max="1"
         step='0.1'
         value={volume}
         type="range"
         />
      </span>
    );
  }
}

export default VolumeSlider;
