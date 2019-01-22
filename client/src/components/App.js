import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
import ImageIndex from '../Images';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const serverURI = 'http://localhost:3210/graphql'
const client = new ApolloClient({
    uri: serverURI
});

class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <ApolloProvider client={client}>
        <Provider store={store} key={Math.random()}>
          <Router>
            <div>
              <Route exact path="/" component={ImageIndex} />
            </div>
          </Router>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
