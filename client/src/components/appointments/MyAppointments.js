import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadMyAppointments, deleteAppointment } from './actions';
import ClientAppointmentItem from './ClientAppointmentItem';
import CancelModal from '../utils/CancelModal.js';

class MyAppointments extends Component {
  state = {
    showCancelModal: false,
  }

  componentDidMount() {
    return this.props.loadMyAppointments()
  }

  toggleModal = (id) => {
    this.setState({ showCancelModal: !this.state.showCancelModal, deleteId: id });
  }

  handleDeleteAppointment = () => {
    this.setState({ showCancelModal: !this.state.showCancelModal});
    return this.props.deleteAppointment(this.state.deleteId)
  }

  render(){
    const { appointments, loading } = this.props;
    const myAppointments = appointments.map(appointment => <ClientAppointmentItem key={appointment._id} appointment={ appointment } toggleModal={ this.toggleModal }/>)
    return(
      <section class="hero is-light has-text-centered">
        <br/>
        <br/>
        <br/>
        <CancelModal toggleModal={this.toggleModal}
          showCancelModal={this.state.showCancelModal}
          handleDeleteAppointment={this.handleDeleteAppointment}
        />
        <h3 class="title animated fadeIn">My Appointments</h3>
        <div class="columns">
          <div class="column is-one-third is-offset-one-third">{myAppointments}</div>
        </div>
      </section>
    );
  }
}

export default connect(({ auth, loading, appointments }) => ({
  loading,
  appointments
}), {
   loadMyAppointments,
   deleteAppointment
  })(MyAppointments);
