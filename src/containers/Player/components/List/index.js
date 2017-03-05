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
        {this.props.list.map(({ name, src, cover }, i) => (
          <Col onClick={() => this.props.select(src)} key={i} md={4}>
            <div style={{ backgroundImage: `url(${cover})` }} className='card'>
              <img src='./icons/big_play.png'/>
              <p>{this.props.inline ? `${name.slice(0, 6)}...`: name}</p>
            </div>
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
