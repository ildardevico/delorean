import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loadList } from './actions';

class List extends Component {
  componentDidMount() {
    this.props.getList();
  }

  render() {
    return (
      <div>
      <Col md={12}>
      {this.props.list.map((video, i) => (
        <Col key={i} md={4}>
          <span onClick={() => this.props.select(video)}>{video}</span>
        </Col>
      ))}
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
