
import combineEvents from 'utils/combineEvents';
import { ADD_TO_COUNTER } from './constants';

export const counter = combineEvents({
  [ADD_TO_COUNTER]: (state, action) => state + action.count,
}, 0);
