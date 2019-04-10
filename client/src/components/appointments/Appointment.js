import React, { Component } from 'react';
import AppointmentForm from './AppointmentForm';

class Appointments extends Component {
  render(){
    return(
      <section class="hero is-warning">
        <div class="hero-body">
          <div class="container has-text-centered">
            <br/>
            <br/>
            <h3 class="animated fadeIn title">Book an Appointment</h3>
            <p class="animated fadeIn subtitle">Please fill out the required fields to proceed</p>
            <hr/>
            <br/>
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
