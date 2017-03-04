import React, { Component } from 'react';
import { connect } from 'react-redux';
import Controls from './components/Controls';
import './styles.scss';

class Player extends Component {

  state = {
    paused: true,
  }

  componentDidMount() {
    const { video } = this.refs;
    video.addEventListener('pause', () => {
      this.setState({
        paused: video.paused,
      });
    });

    video.addEventListener('play', () => {
      this.setState({
        paused: video.paused,
      });
    });

    video.addEventListener('timeupdate', () => {
      const now = (video.currentTime/video.duration) * 100;
      this.refs.controls.refs.progressbar.updateNow(now);
    });

    video.addEventListener('volumechange', () => {

    });
  }

  componentWillUnmount() {
    const { video } = this.refs;
    video.removeEventListener('pause');
    video.removeEventListener('play');
    video.removeEventListener('timeupdate');
    video.removeEventListener('volumechange');
  }

  play = () => {
    this.refs.video.play();
  }

  mute = () => {
    this.refs.video.mute();
  }

  pause = () => {
    this.refs.video.pause();
  }

  changeVolume = volume => {
    this.refs.video.volume = volume;
  }

  changeDuration = width => {
    this.refs.video.currentTime = (width/100) * this.refs.video.duration;
  }

  expand = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  }


  render() {
    const src = './video/player.mp4';
    const {
      play,
      pause,
      changeDuration,
      changeVolume,
      mute,
      expand,
     } = this;
    const { paused, expanded } = this.state;
    return (
      <div className={`player-container ${expanded ? 'expanded': ''}`}>
        <video ref='video'>
          <source src={src} />
        </video>
        <div className='controls-container'>
          <Controls
           ref='controls'
           play={play}
           pause={pause}
           changeVolume={changeVolume}
           changeDuration={changeDuration}
           mute={mute}
           paused={paused}
           expand={expand}
           />
        </div>
      </div>
    );
  }
}

export default connect(
  state => state
)(Player);
