import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Notifications from 'react-notification-system-redux';
import publishVk from 'utils/publish/vk';
import Controls from './components/Controls';
import ShareControls from './components/ShareControls';
import { shazam } from './actions';
import Spinner from 'components/Spinner';
import List from './components/List';
import './styles.scss';

const notificationOpts = {
  title: 'Shared!',
  message: 'Your video was shared'
};

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
      this.loadGif(options).then(() => {
        this.setState({ spinner: false });
        this.props.showSnack(Notifications.success({
          ...notificationOpts,
          message: 'Your Gif was shared!'
        }));
        this.back();
      });
    } else {
      this.loadVideo(options).then(() => {
        this.setState({ spinner: false });
        this.props.showSnack(Notifications.success({
          ...notificationOpts,
          message: 'Your Video was shared!'
        }));
        this.back();
      });
    }
  }

  loadGif({ duration, start, fileName, title, message = '' }) {
    return publishVk({
      type: 'gif',
      fileName: fileName || 'GoPro.mp4',
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

  shazam = () => {
    this.props.shazam({ fileName: this.props.fileName || 'GoPro.mp4', time: this.refs.video.currentTime || 0 })
    .then(({ res: data }) => {
      data.forEach(track => {
        this.props.showSnack(Notifications.success({
          title: track.title,
          message: track.artists.join(' ') + track.album
        }));
      });
    });
    //TODO ebanut' filename
  }

  share = () => {
    this.setState({
      duration: Math.round(this.refs.video.duration),
      currentTime: Math.round(this.refs.video.currentTime),
    });
    this.pause();
    this.setState({ sharing: true });
  }

  back = () => {
    this.setState({
      sharing: false,
      duration: null,
      currentTime: null,
    });
  }

  select = selected => {
    this.setState({
      selected,
    }, () => {
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
        if(this.refs.controls && this.refs.controls.refs.progressbar) {
          this.refs.controls.refs.progressbar.updateNow(now);
        }
      });
    });
  }

  toList = () => {
    this.setState({
      selected: null,
    });
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
      back,
      shazam,
      toList,
      select,
     } = this;
    const {selected, paused, expanded, muted, sharing, duration, currentTime, spinner } = this.state;
    const src  = `./video/original/${selected}`;
    if(selected) {
      return (
        <div className={`player-container ${expanded && !sharing ? 'expanded': ''}`}>
          <div className={sharing ? 'hide' : ''}>
            <video ref='video'>
              <source src={src} />
            </video>
            <div className='controls-container'>
              <Controls
                ref='controls'
                play={play}
                share={share}
                pause={pause}
                changeVolume={changeVolume}
                changeDuration={changeDuration}
                mute={mute}
                toList={toList}
                muted={muted}
                paused={paused}
                expand={expand}
                shazam={shazam}
              />
            </div>
          </div>
          {
            sharing &&
            <ShareControls
              className={!sharing ? 'hide' : ''}
              duration={duration}
              currentTime={currentTime}
              handler={shareHandler}
              back={back}
              src={src}
            />
          }
          <div style={{display: `${!spinner ? 'none': 'block'}`}}>
            <Spinner />
          </div>
        </div>
      );
    } else {
      return <List select={select} />;
    }

  }
}

export default connect(
  state => state,
  dispatch => ({
    showSnack: opt => dispatch(opt),
    goTo: path => dispatch(push(path)),
    shazam: data => dispatch(shazam(data))
  })
)(Player);
