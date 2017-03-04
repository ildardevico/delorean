import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import store from 'store';
import Layout from 'containers/Layout';
import Login from 'containers/Login';

const history = syncHistoryWithStore(browserHistory, store);

export default class App extends Component {
  render() {
    return (
       <Provider store={store}>
        <Router history={history}>
          <Route path='/' component={Layout} />
          <Route path='/login' component={Login} />
        </Router>
       </Provider>
    );
  }
}


render( <App/>, document.getElementById('root'));
