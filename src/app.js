import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import store from 'store';
import Layout from 'containers/Layout';
import Player from 'containers/Player';

const history = syncHistoryWithStore(browserHistory, store);

export default class App extends Component {
  render() {
    return (
       <Provider store={store}>
        <Router history={history}>
          <Route path='/' component={Layout} >
            <IndexRoute component={Player} />
          </Route>
        </Router>
       </Provider>
    );
  }
}


render( <App/>, document.getElementById('root'));
