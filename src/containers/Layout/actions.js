import { ADD_TO_COUNTER } from './constants';

export function increaseCounter(count) {
  return {
    type: ADD_TO_COUNTER,
    count
  };
}
