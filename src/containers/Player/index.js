import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Notifications from 'react-notification-system-redux';
import publishVk from 'utils/publish/vk';
import downloadFile from 'utils/publish/download';
import Controls from './components/Controls';
import ShareControls from './components/ShareControls';
import CustomControl from './components/CustomControl';
import { shazam } from './actions';
import Spinner from 'components/Spinner';
import List from './components/List';
import './styles.scss';

class Player extends Component {

  state = {
    paused: true,
    shareType: 'gif',
    shazamLoading: false
  }

  changeShareType = () => {
    const { shareType } = this.state;
    const newShareType = shareType === 'gif' ? 'video' : 'gif';
    this.setState({ shareType: newShareType });
  }

  shareHandler = ({ duration, start, message = '' }) => {
    const { shareType } = this.state;
    const { title = '' } = this.props;
    this.setState({ spinner: true });

    publishVk({
      type: shareType,
      fileName: this.state.selected,
      start,
      duration,
      message,
      title
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
    const { shareType } = this.state;
    this.setState({ spinner: true });

    downloadFile({
      type: shareType,
      fileName: this.state.selected,
      start,
      duration
    }).then(path => {
      this.setState({ spinner: false });
      this.props.showSnack(Notifications.success({
        title: 'Success!',
        message: `Your ${shareType === 'gif' ? 'Gif' : 'Video'} was created!`
      }));
      window.open(path);
    }).catch(error => {
      this.setState({ spinner: false });
      this.props.showSnack(Notifications.error({
        title: 'Error!',
        message: error
      }));
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

  togglePlay = () => {
    const { paused } = this.refs.video;
    if (paused) {
      this.play();
    } else {
      this.pause();
    }
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
    this.setState({ shazamLoading: true });
    this.props.shazam({ fileName: this.state.selected, time: this.refs.video.currentTime || 0 })
    .then(({ tracks }) => {
      if (!tracks.length) {
        this.props.showSnack(Notifications.error({
          title: 'Music recognizer',
          message: 'Can not recognize( Try again'
        }));
      }
      tracks.forEach(track => {
        this.props.showSnack(Notifications.success({
          title: track.title,
          message: track.artists.join(' ') + track.album
        }));
      });
    })
    .then(() => this.setState({ shazamLoading: false }));
    //TODO ebanut' filename
  }

  shazamHandler = () => {
    const { shazam } = this;
    const { shazamLoading } = this.state;
    if (!shazamLoading) {
      shazam();
    }
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
      shazamHandler,
      toList,
      select,
     } = this;

    const {
      shareType,
      selected,
      paused,
      expanded,
      muted,
      sharing,
      duration,
      currentTime,
      spinner,
      shazamLoading
    } = this.state;

    const publishControl = (
      <CustomControl
        top="10"
        icon={<i className="fa fa-hand-scissors-o"></i>}
        text="Make 30 sec video/gif"
        handler={share}
      />
    );

    const shazamControl = (
      <CustomControl
        top="60"
        icon={
          shazamLoading
            ? (<i className="fa fa-spinner fa-spin"></i>)
            : (<i className="material-icons">hearing</i>)
        }
        text="Recognize sound"
        handler={shazamHandler}
      />
    );

    if(selected) {
      return (
        <div className={`player-container ${expanded && !sharing ? 'expanded': ''}`}>
          <div className={sharing ? 'hide' : ''}>
            <video ref='video' onClick={this.togglePlay}>
              <source src={selected} />
            </video>
            <div className='controls-container'>
              <Controls
                ref='controls'
                play={play}
                pause={pause}
                changeVolume={changeVolume}
                changeDuration={changeDuration}
                mute={mute}
                muted={muted}
                paused={paused}
                expand={expand}
                toList={toList}
              />
            </div>
            {sharing || publishControl}
            {sharing || shazamControl}
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
              src={selected}
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
