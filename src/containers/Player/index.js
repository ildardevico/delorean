import React, { Component } from 'react';
import { connect } from 'react-redux';
import Controls from './components/Controls';
import ShareControls from './components/ShareControls';
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

  }

  componentWillUnmount() {
    const { video } = this.refs;
    video.removeEventListener('pause');
    video.removeEventListener('play');
    video.removeEventListener('timeupdate');
  }

  play = () => {
    this.refs.video.play();
  }

  mute = () => {
    this.refs.video.muted = !this.refs.video.muted;
    this.setState({ muted: this.refs.video.muted });
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

  share = () => {
    this.setState({
      duration: Math.round(this.refs.video.duration),
      currentTime: Math.round(this.refs.video.currentTime),
    });
    this.setState({ sharing: true });
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
      share,
     } = this;
    const { paused, expanded, muted, sharing, duration, currentTime } = this.state;
    return (
      <div className={`player-container ${expanded ? 'expanded': ''}`}>
        <video ref='video'>
          <source src={src} />
        </video>
        <div className='controls-container'>
          {
            !sharing ?
            <Controls
             ref='controls'
             play={play}
             share={share}
             pause={pause}
             changeVolume={changeVolume}
             changeDuration={changeDuration}
             mute={mute}
             muted={muted}
             paused={paused}
             expand={expand}
             />:
             <ShareControls
              duration={duration}
              currentTime={currentTime}
              />
            }
        </div>
      </div>
    );
  }
}

export default connect(
  state => state
)(Player);
