import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';

import { Nav, Home, Home2, Register, Login, sexy } from './components/layout';

import { setCurrentUser, logoutUser, clearCurrentProfile } from './actions';

import store from './stores';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/users/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/users/home" component={Home2} />
              <Route exact path="/users/sexy" component={sexy} />

              <Route exact path="/users/register" component={Register} />
              <Route exact path="/users/login" component={Login} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
