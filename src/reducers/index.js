import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { counter } from './counter'
import { reducer as notifications } from 'react-notification-system-redux'

const reducers = {
  routing,
  counter,
  notifications,
}

export default combineReducers(reducers)
