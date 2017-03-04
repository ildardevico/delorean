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
    video.addEventListener('seeked', () => {

    });

    video.addEventListener('volumechange', () => {

    });
  }

  componentWillUnmount() {
    const { video } = this.refs;
    video.removeEventListener('pause');
    video.removeEventListener('play');
    video.removeEventListener('timeupdate');
    video.removeEventListener('seeked');
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

  changeDuration = duration => {
    this.refs.video.currentTime = duration;
  }


  render() {
    const src = './video/player.mp4';
    const {
      play,
      pause,
      changeDuration,
      changeVolume,
      mute,
     } = this;
    const { paused } = this.state;
    return (
      <div className='player-container'>
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
           />
        </div>
      </div>
    );
  }
}

export default connect(
  state => state
)(Player);
