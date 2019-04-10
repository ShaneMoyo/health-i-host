import React from 'react';
import { Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signin, signup } from './actions';
import Credentials from './Credentials';


function Auth({ user, signin, signup, error, location, loading }) {
  const redirect = location.state ? location.state.from : '/';


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
              <Credentials action="Sign In" submit={signin} loading={loading} error={error}/>
            </div>
          )}/>
          <Route path="/auth/signup" render={() => (
            <div class="is-warning has-text-white">
              <br/>
              <br/>
              <br/>
              <p>Already have an account? <Link class="button is-outlined is-small is-light" to="/auth/signin">Sign In</Link></p>
              <Credentials action="Sign Up" submit={signup} allowName={true} loading={loading} error={error}/>
            </div>
          )}/>
        </Switch>
    </section>
  );
}

export default withRouter(connect(
  ({ auth, loading, error }) => ({
    user: auth.user,
    error,
    loading
  }),
  { signup, signin }
)(Auth));
