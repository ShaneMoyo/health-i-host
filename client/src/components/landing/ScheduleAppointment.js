import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBarLink = props => <NavLink {...props} className="nav-link tile is-parent" activeClassName="active"/>;

export default function ScheduleAppointment(props) {
  return <div class="container has-text-centered">
          <div class="subtitle has-text-centered">
            A healthy body allows us to live an optimal life with energy and enthusiasm.
            Do you want to be in balance, free from pain, able to be active, and doing your heart’s desires?
          </div>
          <br/>
          <div class="subtitle has-text-centered">
            <NavBarLink exact to="/appointment">
              <div class="tile is-parent is-vertical grow more">
                <article class="tile is-child notification has-text-white is-info">
                <p class="title">
                  Schedule Appointment
                </p>
                </article>
              </div>
            </NavBarLink>
          </div>
        </div>

}
