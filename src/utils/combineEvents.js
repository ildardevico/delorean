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
    if (Reflect.has(reducers, action.type)) {
      return reducers[action.type](state, action);
    } else if (Reflect.has(reducers, 'default')) {
      return reducers.default(state, action);
    }
    return state;
  };
}
