import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadMyAppointments, deleteAppointment } from './actions';
import ClientAppointmentItem from './ClientAppointmentItem';
import CancelModal from '../utils/CancelModal.js';

function MyAppointments (props) {

  async function loadAppointments() { await loadMyAppointments() }

  useEffect(() => { loadAppointments() }, []);

  const { appointments, loading, deleteAppointment, loadMyAppointments } = props;
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const handleDeleteAppointment = () => deleteAppointment(deleteId).then(() => setShowModal(false))
  const myAppointments = appointments.map(appointment => <ClientAppointmentItem key={appointment._id} appointment={ appointment } toggleModal={() => setShowModal(!showModal) }/>)

  return(
    <section class="hero is-warning">
      <div class="hero-body">
        <div class="container has-text-centered">
          <section class="hero is-warning is-fullheight">
            <div class="column is-waring is-6 is-offset-3">
              <div class="box animated fadeIn is-warning" >
                <CancelModal toggleModal={setShowModal}
                  showCancelModal={showModal}
                  handleDeleteAppointment={handleDeleteAppointment}
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


export default connect(({ auth, loading, appointments }) => ({
  loading,
  appointments
}), {
   loadMyAppointments,
   deleteAppointment
  })(MyAppointments);
