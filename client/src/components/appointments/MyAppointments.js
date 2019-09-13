import React, {Component } from 'react';
import { connect } from 'react-redux';
import { loadMyAppointments, bookAppointment, loadAllAppointments, deleteAppointment } from './actions';
import ClientAppointmentItem from './ClientAppointmentItem';
import AdminAppointmentItem from './AdminAppointmentItem';

class MyAppointments extends Component {
  state = {
    showCancelModal: false,
  }

  componentDidMount() {
    console.log('componentDidMount: ', this.state)
    if(this.props.user.roles[0] === 'admin') return this.props.loadAllAppointments();
    return this.props.loadMyAppointments()
  }

  toggleModal = (id) => {
    console.log('here in toggle modal', id)
    this.setState({ showCancelModal: !this.state.showCancelModal, deleteId: id });
  }

  handleDeleteAppointment = () => {
    this.setState({ showCancelModal: !this.state.showCancelModal});
    return this.props.deleteAppointment(this.state.deleteId)
  }

  render(){
    const { appointments, loading, user} = this.props;
    const MyAppointments = appointments.map(appointment => {

      const isAdmin = user.roles[0] === 'admin';
      const appointmentItem = isAdmin ?
      <AdminAppointmentItem appointment={ appointment }/> :
      <ClientAppointmentItem appointment={ appointment } toggleModal={ this.toggleModal }/>
      return appointmentItem
    })
    return(
      <section class="hero is-light">
        <div class={this.state.showCancelModal ? "modal is-active animated fadeIn" : "modal" }>
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Cancel Appointment</p>
              <button  onClick={() => this.toggleModal()}class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
              Are you sure you want to cancel? Once cancelled the appointment must be rescheduled if you change you mind.
            </section>
            <footer class="modal-card-foot">
              <button onClick={() => this.handleDeleteAppointment()} class="button is-danger">Cancel</button>
            </footer>
          </div>
        </div>
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
}), { loadMyAppointments, bookAppointment, loadAllAppointments, deleteAppointment }
)(MyAppointments);
