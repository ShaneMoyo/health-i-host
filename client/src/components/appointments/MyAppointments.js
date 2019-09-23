import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadMyAppointments, deleteAppointment } from './actions';
import AppointmentItem from './AppointmentItem';
import CancelModal from '../utils/CancelModal.js';
import moment from 'moment'
import Fade from 'react-reveal/Fade';
import Icon from '@mdi/react'
import {  mdiDotsHorizontal, mdiPlus } from '@mdi/js'
import { NavLink } from 'react-router-dom';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

const NavBarLink = props => <NavLink {...props} className="nav-link" activeClassName="active"/>;

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
              { loading ?
                <div class="has-text-centered">
                <Loader
                   type="Grid"
                   color="#8ab6c6"
                   height={500}
                   width={100}

                /></div>:
                <ul class="appointment-list">
                  {myAppointments}
                  <li class="appointments">
                  <NavBarLink exact to="/appointment">
                    <div class="tile is-parent is-vertical grow more">
                      <article class="tile is-child notification has-text-white is-info">
                      <p class="title">
                        Book
                        <span class="icon has-text-info is-pulled-right ">
                        <i class="fas fa-info-circle">
                        <Icon
                        className="animated fadeIn"
                        path={mdiPlus}
                        title="User Profile"
                        size={1}
                        horizontal
                        vertical
                        color="white"
                        />
                        </i>
                        </span>
                      </p>
                      </article>
                    </div>
                    </NavBarLink>
                  </li>
                </ul>
              }
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
