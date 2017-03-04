import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { counter } from 'containers/Layout/reducers';
import { reducer as notifications } from 'react-notification-system-redux';
import { reducer as formReducer } from 'redux-form';

const reducers = {
  routing,
  counter,
  notifications,
  form:formReducer,
};

export default combineReducers(reducers);
