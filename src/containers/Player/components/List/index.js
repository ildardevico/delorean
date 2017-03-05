import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loadList } from './actions';
import './styles.scss';

class List extends Component {
  componentDidMount() {
    this.props.getList();
  }

  render() {
    return (
      <div className='list'>
        <Col md={12}>
        {this.props.list.map((video, i) => (
          <Col onClick={() => this.props.select(video)} key={i} md={4}>
            <div style={{backgroundImage: `url(./icons/prev.jpg)`}} className='card'>
              <img src='./icons/big_play.png'/>
              <p>{video}</p>
            </div>
          </Col>
        ))}
        <Col md={4}>
          <div style={{backgroundImage: `url(./icons/prev.jpg)`}} className='card'>
            <img src='./icons/big_play.png'/>
            <p >dasdas</p>
          </div>
        </Col>
        <Col md={4}>
          <div style={{backgroundImage: `url(./icons/prev.jpg)`}} className='card'>
            <img src='./icons/big_play.png'/>
            <p>ddasdasdsa</p>
          </div>
        </Col>
        </Col>
      </div>
    );
  }
}

export default connect(
  ({ list }) => ({ list }),
  dispatch => ({
    getList: () => dispatch(loadList())
  })
)(List);
