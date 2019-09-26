import React from 'react';
import { Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { signin, signup } from './actions';
import Credentials from './Credentials';


function Auth({ location }) {
  const redirect = location.state ? location.state.from : '/';
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const handleSignIn = (credentials) => {
    return dispatch(signin(credentials))
  }

  const handleSignUp = (credentials) => {
    return dispatch(signup(credentials))
  }

  if(user) return <Redirect to={redirect}/>;

  return (
    <section class="hero is-fullheight has-text-centered is-warning login">
        <Switch>
          <Route path="/auth/signin" component={() => (
            <div class="is-warning has-text-white">
              <br/>
              <br/>
              <br/>
              <p>Not yet registered? <Link class="button is-outlined is-small is-light" to="/auth/signup">Sign Up</Link></p>
              <Credentials action="Sign In" submit={handleSignIn} loading={loading} error={error}/>
            </div>
          )}/>
          <Route path="/auth/signup" render={() => (
            <div class="is-warning has-text-white">
              <br/>
              <br/>
              <br/>
              <p>Already have an account? <Link class="button is-outlined is-small is-light" to="/auth/signin">Sign In</Link></p>
              <Credentials action="Sign Up" submit={handleSignUp} allowName={true} loading={loading} error={error}/>
            </div>
          )}/>
        </Switch>
    </section>
  );
}

export default withRouter(Auth);
