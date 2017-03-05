import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as notifications } from 'react-notification-system-redux';
import { reducer as formReducer } from 'redux-form';
import { list } from 'containers/Player/components/List/reducers';

const reducers = {
  routing,
  notifications,
  form:formReducer,
  list,
};

export default combineReducers(reducers);
