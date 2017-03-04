import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import reducer from 'reducers';

const routerMiddleware = createRouterMiddleware(browserHistory);

export default createStore(
  reducer,
  compose(
    applyMiddleware(
      thunk,
      routerMiddleware
    )
  )
);
