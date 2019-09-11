import React, {Component } from 'react';
import { connect } from 'react-redux';
import { loadMyAppointments, bookAppointment, loadAllAppointments } from './actions';
import ClientAppointmentItem from './ClientAppointmentItem';
import AdminAppointmentItem from './AdminAppointmentItem';

class MyAppointments extends Component {
  componentDidMount() {
    if(this.props.user.roles[0] === 'admin') return this.props.loadAllAppointments();
    return this.props.loadMyAppointments();
  }

  render(){
    const { appointments, loading, user} = this.props;
    const MyAppointments = appointments.map(appointment => {
      
      const isAdmin = user.roles[0] === 'admin';
      const appointmentItem = isAdmin ?
      <AdminAppointmentItem appointment={ appointment }/> :
      <ClientAppointmentItem appointment={ appointment }/>
      return appointmentItem
    })
    return(
      <section class="hero is-light">
        <div class="container has-text-centered">
        <br/>
        <br/>
        <br/>
        <h3 class="title">My Appointments</h3>
        <div class="columns">
          <div class="column is-one-third is-offset-one-third">{MyAppointments}</div>

        </div>
        </div>
      </section>
    );
  }
}

export default connect(({ auth, loading, appointments }) => ({
  user: auth.user,
  loading,
  appointments
}), { loadMyAppointments, bookAppointment, loadAllAppointments }
)(MyAppointments);
