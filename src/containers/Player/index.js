import React, { Component } from 'react';
import { connect } from 'react-redux';
import publishVk from 'utils/publish/vk';
import Controls from './components/Controls';
import ShareControls from './components/ShareControls';
import './styles.scss';

const GIF = 'GIF';

class Player extends Component {

  state = {
    paused: true,
    shareType: GIF,
  }

  shareHandler = options => {
    options = {
      fileName: this.props.fileName,
      title: this.props.tytle,
      ...options,
    };
    this.setState({
      spinner: true,
    });
    if(this.state.shareType === GIF) {
      this.loadGif(options).then(() => this.setState({ spinner: false }));
    } else {
      this.loadVideo(options).then(() => this.setState({ spinner: false }));
    }
  }

  loadGif({ duration, start, fileName, title, message = '' }) {
    return publishVk({
      type: 'gif',
      fileName: fileName || 'player.mp4',
      start,
      duration,
      message,
      title: title || 'hello-tytle',
    });
  }

  loadVideo({ duration, start, fileName, title, message = '' }) {
    return publishVk({
      type: 'video',
      fileName,
      start,
      duration,
      message,
      title,
    });
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
      if(this.refs.controls.refs.progressbar) {
        this.refs.controls.refs.progressbar.updateNow(now);
      }
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
    this.pause();
    this.setState({ sharing: true });
  }

  render() {
    const {
      play,
      pause,
      changeDuration,
      changeVolume,
      mute,
      expand,
      share,
      shareHandler,
     } = this;
    const { paused, expanded, muted, sharing, duration, currentTime } = this.state;
    const { src } = this.props;
    return (
      <div className={`player-container ${expanded ? 'expanded': ''}`}>
        <video ref='video'>
          <source src={src || './video/original/player.mp4'} />
        </video>
          {
            !sharing ?
            <div className='controls-container'>
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
               />
             </div>
             :
             <ShareControls
              duration={duration}
              currentTime={currentTime}
              handler={shareHandler}
              />
            }
      </div>
    );
  }
}

export default connect(
  state => state
)(Player);
