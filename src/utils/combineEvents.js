// @flow
/*
  Util for making reducers without switch case
  Example of usage
  const reducerName = combineEvents({
    [CONSTANT]: (state, { data }) => data
  }, initialValue)
*/

export default function combineEvents(reducers: Object, initialState: mixed): Function {
  return (state = initialState, action) => {
    if (reducers.hasOwnProperty(action.type)) {
      return reducers[action.type](state, action);
    } else if (reducers.hasOwnProperty('default')) {
      return reducers.default(state, action);
    }
    return state;
  };
}
