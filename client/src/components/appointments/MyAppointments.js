import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadMyAppointments, deleteAppointment } from './actions';
import AppointmentItem from './AppointmentItem';
import CancelModal from '../utils/CancelModal.js';
import moment from 'moment'
import Fade from 'react-reveal/Fade';
import Icon from '@mdi/react'
import {  mdiDotsHorizontal } from '@mdi/js'

function MyAppointments (props) {

  async function loadAppointments() { await loadMyAppointments() }

  useEffect(() => { loadAppointments() }, []);

  const { appointments, loading, deleteAppointment, loadMyAppointments } = props;
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const handelToggleModdle = (deleteId) => {
    setShowModal(!showModal);
    setDeleteId(deleteId)
  }
  const handleDeleteAppointment = () => deleteAppointment(deleteId).then(() => setShowModal(false))
  const myAppointments = appointments.map(appointment => <AppointmentItem key={appointment._id} appointment={ appointment } toggleModal={() => handelToggleModdle(appointment._id) }/>)

  return(
      <div class="hero-body">
        <div class="container">
          <div class="column is-6 is-offset-3">
            <div class="box animated fadeIn" >
              <CancelModal toggleModal={setShowModal}
                showCancelModal={showModal}
                handleDeleteAppointment={handleDeleteAppointment}
              />
              <h3 class="title is-3 animated fadeIn has-text-centered">Appointments</h3>
              <hr/>
              
              <ul class="appointment-list">
                {myAppointments}
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
  }


export default connect(({ auth, loading, appointments }) => ({
  loading,
  appointments
}), {
   loadMyAppointments,
   deleteAppointment
  })(MyAppointments);
