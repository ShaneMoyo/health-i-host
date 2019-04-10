import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout } from '../auth/actions';
import logo from '../../assets/images/logo.png';


const NavBarLink = props => <NavLink {...props}
  className="nav-link"
  activeClassName="active"
/>;

class Navigation extends Component {

  state = {
    isActive: false
  }

  onClickNav = () => {
    this.setState({ isActive: !this.state.isActive });
  }
  handleSignOut = () => {
    this.props.signout();
  }

  render() {
    const { user } = this.props;
    const { isActive } = this.state;
    return (
      <div class="hero-head">
        <nav class="navbar">
          <div class="container is-fluid">
            <div class="navbar-brand">

              <a class="navbar-item">
                <NavBarLink class=" home-button" exact to="/"><img height="100%" src={logo} /></NavBarLink>
              </a>

              {user ? <a class="navbar-item is-transparent">
                {`Hello, ${user.firstName}`}
              </a> : null}

              <span class={isActive ? 'navbar-burger burger is-active' : 'navbar-burger burger'} data-target="navbarMenu" onClick={() => this.onClickNav()}>
                <span></span>
                <span></span>
                <span></span>
              </span>

            </div>

            <div class={isActive ? 'animated fadeIn navbar-menu is-active is-success' : 'animated fadeIn navbar-menu'}>
              <div class="navbar-end">

                {!user && <a class="navbar-item is-transparent">
                  <NavBarLink exact to="/auth/signin" onClick={() => this.onClickNav()}><span  class="tag is-warning">Log in</span></NavBarLink>
                </a>}

                <a class="navbar-item is-transparent">
                  <NavBarLink exact to="/massage" onClick={() => this.onClickNav()}><span class="tag is-warning">Massage</span></NavBarLink>
                </a>

                <a class="navbar-item is-transparent">
                  <NavBarLink exact to="/minerals" onClick={() => this.onClickNav()}><span class="tag is-warning">Minerals</span></NavBarLink>
                </a>

                <a class="navbar-item is-transparent">
                  <NavBarLink exact to="/Movement" onClick={() => this.onClickNav()}><span class="tag is-warning">Movement</span></NavBarLink>
                </a>

                <a class="navbar-item is-transparent">
                  <NavBarLink exact to="/appointment" onClick={() => this.onClickNav()}><span class="tag is-warning">Book Appointment</span></NavBarLink>
                </a>

                { user && <a class="navbar-item" onClick={() => this.onClickNav()}>
                  <NavBarLink exact to="/appointment/me"><span class="tag is-warning">My Appointments</span></NavBarLink>
                </a> }

                { user && <a class="navbar-item" onClick={() => this.handleSignOut()}>
                  <NavBarLink exact to="/"><span class="tag is-warning">Log out</span></NavBarLink>
                </a> }
              </div>
            </div>

          </div>
        </nav>

      </div>
    );
  }
}

export default connect(({ auth }) => ({
  user: auth.user
}), { signout }
)(Navigation);
