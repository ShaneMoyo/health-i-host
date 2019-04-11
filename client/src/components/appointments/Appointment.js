import React, { Component } from 'react';
import AppointmentForm from './AppointmentForm';

class Appointments extends Component {
  render(){
    return(
      <section class="hero is-warning">
        <div class="hero-body">
          <div class="container has-text-centered">
            <div class="container has-text-centered">
              <AppointmentForm/>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Appointments;
