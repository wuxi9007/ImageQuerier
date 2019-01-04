import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
import ImageIndex from '../Images';

class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store} key={Math.random()}>
        <Router>
          <div>
            <Route exact path="/" component={ImageIndex} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
