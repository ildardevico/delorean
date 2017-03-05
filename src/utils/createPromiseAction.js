export default function createPromiseAction(action, success, fail = null) {
  return (...options) => (
    dispatch => (
      action(...options)
      .then(response => dispatch({
        type: success,
        res: response.res
      }))
      .catch(err => dispatch({
        type: !fail ? `${success}_FAIL`: fail,
        // res: response.res
      }))
    )
  );
}
