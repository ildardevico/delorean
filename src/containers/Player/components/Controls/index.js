import React, { Component } from 'react';
import Progress from '../Progress';
import Volume from '../Volume';

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
      muted,
      share,
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
            <Volume handler={changeVolume} mute={mute} muted={muted}/>
            <span>
              <span>{currentTime}</span>
              <span>{duration}</span>
            </span>
          </div>
          <div className='right'>
            <span>
              <i onClick={share} className="material-icons">screen_share</i>
            </span>
            <span>
              <i className="material-icons">audiotrack</i>
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
