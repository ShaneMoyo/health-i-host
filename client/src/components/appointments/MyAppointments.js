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
  const myAppointments = appointments.map(appointment => {
    const old = <AppointmentItem key={appointment._id} appointment={ appointment } toggleModal={() => handelToggleModdle(appointment._id) }/>
    const capatilizedType = appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)
    const colorMap = {
      massage: 'success',
      movement: 'primary',
      mineral: 'warning'
    }
    const color = colorMap[appointment.type];
    const className = `tile is-child notification has-text-white is-${color}`

    const neww = <li>
                  <Fade>
                    <div>

                    <div class="tile is-parent is-vertical">
                      <article class={className}>
                        <span class="icon has-text-info is-pulled-right">
                          <i class="fas fa-info-circle">
                          <Icon path={mdiDotsHorizontal}
                            title="User Profile"
                            size={1}
                            horizontal
                            vertical
                            color="white"
                            />
                          </i>
                        </span>
                        <p class="title">{capatilizedType}</p>
                        <p class="subtitle">{moment(appointment.date).format('MM/DD/YYYY hh:mm a')}</p>
                      </article>
                    </div>
                    </div>
                  </Fade>
                </li>
    return neww
  })

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
              <br/>
              <ul>
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
