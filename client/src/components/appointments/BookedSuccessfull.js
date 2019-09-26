import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBarLink = props => <NavLink {...props} className="nav-link" activeClassName="active"/>;
function AppointmentForm() {
    return (
          <div class="container has-text-centered">
            <br/><br/>
            <section class="hero is-warning is-fullheight">
              <div class="column is-waring is-6 is-offset-3">
                <div class="box animated fadeIn is-warning" >
                  <div>
                    <div class="animated fadeIn title is-6">Appointment Booked Succesfully</div>
                    <br/>
                    <div class="animated fadeIn button is is-info"><NavBarLink exact to="/appointment/me">Proceed to My Appointments</NavBarLink></div>
                  </div>
                </div>
              </div>
            </section>
          </div>
    );
}

export default AppointmentForm;
