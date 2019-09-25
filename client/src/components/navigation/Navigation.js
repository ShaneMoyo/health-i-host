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
      <div className="hero-head">
        <nav className="navbar">
          <div className="container is-fluid">
            <div className="navbar-brand">

              <div className="navbar-item">
                <NavBarLink className=" home-button" exact to="/"><img height="100%" src={logo} /></NavBarLink>
              </div>

              {user ? <div className="navbar-item is-transparent">
                {`Hello, ${user.firstName}`}
              </div> : null}

              <span className={isActive ? 'navbar-burger burger is-active' : 'navbar-burger burger'} data-target="navbarMenu" onClick={() => this.onClickNav()}>
                <span></span>
                <span></span>
                <span></span>
              </span>

            </div>

            <div className={isActive ? 'animated fadeIn navbar-menu is-active is-success' : 'animated fadeIn navbar-menu'}>
              <div className="navbar-end ">

                {!user && <div className="navbar-item is-transparent">
                  <NavBarLink exact to="/auth/signin" onClick={() => this.onClickNav()}><span  className="tag is-warning">Log in</span></NavBarLink>
                </div>}

                <div className="navbar-item is-transparent">
                  <NavBarLink exact to="/massage" onClick={() => this.onClickNav()}><span className="tag is-warning">Massage</span></NavBarLink>
                </div>

                <div className="navbar-item is-transparent">
                  <NavBarLink exact to="/minerals" onClick={() => this.onClickNav()}><span className="tag is-warning">Minerals</span></NavBarLink>
                </div>

                <div className="navbar-item is-transparent">
                  <NavBarLink exact to="/Movement" onClick={() => this.onClickNav()}><span className="tag is-warning">Movement</span></NavBarLink>
                </div>

                <div className="navbar-item is-transparent">
                  <NavBarLink exact to="/appointment" onClick={() => this.onClickNav()}><span className="tag is-warning">Shcedule Appointment</span></NavBarLink>
                </div>

                { user && <div className="navbar-item" onClick={() => this.onClickNav()}>
                  <NavBarLink exact to="/appointment/me"><span className="tag is-warning">My Appointments</span></NavBarLink>
                </div> }

                { user && <div className="navbar-item" onClick={() => this.handleSignOut()}>
                  <NavBarLink exact to="/"><span className="tag is-warning">Log out</span></NavBarLink>
                </div> }
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
