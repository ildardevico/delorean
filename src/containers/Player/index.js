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

class Player extends Component {

  state = {
    paused: true,
    shareType: 'gif'
  }

  changeShareType = () => {
    const { shareType } = this.state;
    const newShareType = shareType === 'gif' ? 'video' : 'gif';
    this.setState({ shareType: newShareType });
  }

  shareHandler = ({ duration, start, message = '' }) => {
    const { shareType } = this.state;
    const { fileName = '', title = '' } = this.props;
    this.setState({ spinner: true });

    publishVk({
      type: shareType,
      fileName: fileName || 'GoPro.mp4',
      start,
      duration,
      message,
      title: title
    }).then(() => {
      this.setState({ spinner: false });
      this.props.showSnack(Notifications.success({
        title: 'Success!',
        message: `Your ${shareType === 'gif' ? 'Gif' : 'Video'} was shared!`
      }));
      this.back();
    }).catch(error => {
      this.setState({ spinner: false });
      this.props.showSnack(Notifications.error({
        title: 'Error!',
        message: error
      }));
    });
  }

  downloadHandler = ({ duration, start }) => {
    console.log('downloadHandler', { duration, start });
    // const { shareType } = this.state;
    // const { fileName = '', title = '' } = this.props;
    // this.setState({ spinner: true });
    //
    // publishVk({
    //   type: shareType,
    //   fileName: fileName || 'GoPro.mp4',
    //   start,
    //   duration,
    //   message,
    //   title: title
    // }).then(() => {
    //   this.setState({ spinner: false });
    //   this.props.showSnack(Notifications.success({
    //     title: 'Success!',
    //     message: `Your ${shareType === 'gif' ? 'Gif' : 'Video'} was shared!`
    //   }));
    //   this.back();
    // }).catch(error => {
    //   this.setState({ spinner: false });
    //   this.props.showSnack(Notifications.error({
    //     title: 'Error!',
    //     message: error
    //   }));
    // });
  }

  // loadGif({ duration, start, fileName, title, message = '' }) {
  //   return publishVk({
  //     type: 'gif',
  //     fileName: fileName || 'GoPro.mp4',
  //     start,
  //     duration,
  //     message,
  //     title: title || 'hello-tytle',
  //   });
  // }
  //
  // loadVideo({ duration, start, fileName, title, message = '' }) {
  //   return publishVk({
  //     type: 'video',
  //     fileName,
  //     start,
  //     duration,
  //     message,
  //     title,
  //   });
  // }

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
    .then(({ tracks }) => {
      tracks.forEach(track => {
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
      downloadHandler,
      back,
      shazam,
      toList,
      select,
     } = this;
    const { shareType, selected, paused, expanded, muted, sharing, duration, currentTime, spinner } = this.state;
    const src  = `./video/original/${selected}`;
    if(selected) {
      return (
        <div className={`player-container ${expanded && !sharing ? 'expanded': ''}`}>
          <div className={sharing ? 'hide' : ''}>
            <video ref='video'>
              <source src={src || './video/original/GoPro.mp4'} />
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
                muted={muted}
                paused={paused}
                expand={expand}
                shazam={shazam}
                toList={toList}
              />
            </div>
          </div>
          {
            sharing &&
            <ShareControls
              className={!sharing ? 'hide' : ''}
              duration={duration}
              currentTime={currentTime}
              shareHandler={shareHandler}
              downloadHandler={downloadHandler}
              back={back}
              src={src}
              shareType={shareType}
              changeShareType={this.changeShareType}
            />
          }
          <Spinner show={spinner} />
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
