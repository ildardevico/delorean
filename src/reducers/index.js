import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { counter } from './counter'

const reducers = {
  routing,
  counter
}

export default combineReducers(reducers)
