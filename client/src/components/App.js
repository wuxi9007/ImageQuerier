import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
// Image pages
import ImageIndex from '../Images';
import ImageSearch from '../Images/ImageSearch';
// User pages
import { Profile as UserProfile } from '../Users/Profile';
// Default NoMatch page
import NoMatch from '../NoMatch';
import { ApolloProvider } from 'react-apollo';
import { client } from '../actions/types';
import "../fontello-1bb48821/css/fontello.css";
import "../fontello-1bb48821/css/animation.css";
import "../../node_modules/bulma/css/bulma.css";
import Header from './Header';
import Footer from './Footer';

class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <ApolloProvider client={client}>
        <Provider store={store} key={Math.random()}>
          <Router>
            <div>
              <Header></Header>
              <div>
                <Switch>
                  <Route exact path="/" component={ImageIndex} />
                  <Route exact path="/images/search" component={ImageSearch}></Route>
                  <Route exact path="/users/profile" component={UserProfile} />
                  <Route component={NoMatch} />
                </Switch>
              </div>
              <Footer></Footer>
            </div>
          </Router>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
