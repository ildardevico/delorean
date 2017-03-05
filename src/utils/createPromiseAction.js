export default function createPromiseAction(action, success, fail = null) {
  return (...options) => (
    dispatch => (
      action(...options)
      .then(res => dispatch({
        type: success,
        ...res
      }))
      .catch(err => dispatch({
        type: console.log(err) || !fail ? `${success}_FAIL`: fail,
        // res: response.res
      }))
    )
  );
}
