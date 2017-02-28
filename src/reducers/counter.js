import { ADD_TO_COUNTER } from '../constants'


export const counter = (state = 0, action) => {
  switch (action.type) {
    case ADD_TO_COUNTER:
      return state + action.count
    default:
      return state
  }
}
