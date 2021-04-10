import PropTypes from "prop-types";
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';

import './App.scss';

// import LoginSelectPage from './pages/auth/LoginSelectPage';
// import LocalLoginPage from './pages/auth/LocalLoginPage';
// import LocalSignupPage from './pages/auth/LocalSignupPage';

import Layout from './layout/index';
import { fetchAuth } from './redux/auth/auth.actions';
import { setLoading } from './redux/page/page.actions';

function App({ isLoading, fetchAuth, setLoading }) {
  useEffect(() => {
    setLoading(true);
    fetchAuth(); // checking if cookie has valid tokenId
  }, [fetchAuth, setLoading]);


  return isLoading ?
    <div>Loading...</div>
    :
    <Router>
      <Layout />
      {/* {
        isLoggedIn ?
        <Layout />
        : (
          <Switch>
            <Route path="/login-select" component={LoginSelectPage} />
            <Route path="/local-login" component={LocalLoginPage} />
            <Route path="/local-signup" component={LocalSignupPage} />
            <Redirect from="/" to="/local-login" />
          </Switch>
        )
      } */}
    </Router>
}

App.propTypes = {
  fetchAuth: PropTypes.func,
  isLoading: PropTypes.any,
  setLoading: PropTypes.func
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.tokenId,
  isLoading: state.page.loading
});

export default connect(
  mapStateToProps,
  { fetchAuth, setLoading },
)(App);