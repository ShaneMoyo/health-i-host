import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '@mdi/react'

const NavBarLink = props => <NavLink {...props}
className="nav-link"
activeClassName="active"
/>;

class Promo extends Component {

  render(){
    const { header1, header2, header3, icon, color } = this.props;
    const className = `hero is-${color} is-bold promo-block is-fullheight`
    return(
      <section class={className}>
        <div class="hero-body">
          <div class="container ">

            <div class="animated fadeIn title is-2 has-text-white">
              { header1 }
              <span class="icon is-large is-pulled-left" >
              <Icon path={icon}
              size={2}
              color="white"
              />
              </span>
            </div>
            <div class="animated fadeIn subtitle has-text-white">
              { header2 }
            </div>
            <div class="animated fadeIn subtitle has-text-white">
              { header3 }
            </div>
            <div class="field">
            <a class="button is-white is-outlined">
              <NavBarLink exact to="/appointment">Book Appointment</NavBarLink>
            </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Promo;
