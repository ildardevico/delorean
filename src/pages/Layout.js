import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increaseCounter } from '../actions/counter'
import '../styles/main.scss'


class Layout extends Component {

  componentDidMount() {
    setInterval(() => this.props.increaseCounter(1), 1000)
  }

  render() {
   return (
    <div className="container">
      Layout
      <div>{this.props.counter}</div>
    </div>
   )
  }
}


export default connect(
  ({ counter }) => ({ counter }),
  dispatch => ({
    increaseCounter: count => dispatch(increaseCounter(count))
  })
)(Layout)
