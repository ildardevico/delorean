import React, { Component } from 'react';
import Progress from '../Progress';

class Controls extends Component {
  render() {
    const {
      play,
      pause,
      changeVolume,
      mute,
      paused,
      expand,
      duration,
      currentTime,
      changeDuration,
    } = this.props;
    return (
      <div>
        <Progress ref='progressbar' changeDuration={changeDuration} />
        <div className='controls'>
          <div className='left'>
            <span onClick={paused ? play: pause}>
                <i className="material-icons">
                  {paused ? 'play_arrow': 'pause'}
                </i>
            </span>
            <span>
              <i onClick={mute} className="material-icons">volume_up</i>
            </span>
            <span>
              <span>{currentTime}</span>
              <span>{duration}</span>
            </span>
          </div>
          <div className='right'>
            <span>
              <i className="material-icons">settings</i>
            </span>
            <span onClick={expand}>
              <i className="material-icons">aspect_ratio</i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Controls.propTypes = {
  play: React.PropTypes.func,
  stop: React.PropTypes.func,
  share: React.PropTypes.func,
  changeVolume: React.PropTypes.func,
  mute: React.PropTypes.func,
};

export default Controls;