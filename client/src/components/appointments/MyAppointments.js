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
    return this.props.deleteAppointment(this.state.deleteId)
      .then(() => this.setState({ showCancelModal: false}))
  }

  render(){
    const { appointments, loading } = this.props;
    const myAppointments = appointments.map(appointment => <ClientAppointmentItem key={appointment._id} appointment={ appointment } toggleModal={ this.toggleModal }/>)
    return(
      <section class="hero is-warning">
        <div class="hero-body">
          <div class="container has-text-centered">
            <section class="hero is-warning is-fullheight">
              <div class="column is-waring is-6 is-offset-3">
                <div class="box animated fadeIn is-warning" >
                  <CancelModal toggleModal={this.toggleModal}
                    showCancelModal={this.state.showCancelModal}
                    handleDeleteAppointment={this.handleDeleteAppointment}
                  />
                  <h3 class="title is-3 animated fadeIn">Appointments</h3>
                  <hr/>
                  <br/>
                  {myAppointments}
                </div>
              </div>
            </section>
          </div>
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
