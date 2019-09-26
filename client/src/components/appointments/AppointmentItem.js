import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateAppointment } from './actions';
import moment from 'moment'
import DateTimePicker from 'react-datetime-picker';
import Fade from 'react-reveal/Fade';
import Icon from '@mdi/react'
import {  mdiCloseCircleOutline, mdiDotsHorizontal, mdiCommentProcessingOutline, mdiPencilOutline, mdiWindowClose, mdiWrenchOutline, mdiPlusBoxOutline, mdiPlus, mdiCheck } from '@mdi/js'
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default function AppointmentItem (props){

  const { appointment, toggleModal } = props;
  const { note: initialNote, date: initialDate, status, type, _id } = appointment;
  const [note, setNote] = useState(initialNote);
  const [addNote, setaAddNote] = useState(false);
  const [edit, setEdit] = useState(false);
  const showNotes = initialNote && !addNote;
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();

  const handleClientUpdate = () => {
    return dispatch(updateAppointment({ ...appointment, note }))
      .then(()=> { setaAddNote(false) })
  }

  const capatilizedType = appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1);

  const colorMap = {
    massage: 'success',
    movement: 'primary',
    mineral: 'warning'
  }
  const durationOptions = {
    0.5: '30 Minutes',
    1: '1 Hour',
    1.5: '1 Hour 30 Minutes',
    2: '2 Hours'
  };
  const statusMap = {
    'pending': 'Pending confirmation'
  }
  const color = colorMap[appointment.type];
  const className = `tile is-child notification has-text-white is-${color}`

  return <li class="appointments">
          <Fade>
            <div>

              <div class={classNames('tile is-parent is-vertical grow', { more: edit })}>
                <article class={className}>

                  <span class="icon has-text-info is-pulled-right " onClick={() => setEdit(!edit)}>
                    <i class="fas fa-info-circle">
                      <Icon
                        className="animated fadeIn"
                        path={ edit ? mdiWindowClose : mdiDotsHorizontal}
                        title="User Profile"
                        size={1}
                        horizontal
                        vertical
                        color="white"
                        />
                    </i>
                  </span>

                  <br/>
                  <p class="title">{capatilizedType}</p>
                  <p class="subtitle">
                    {moment(appointment.date).format('M/DD h:mm a')}
                  </p>
                  { edit &&
                    <div>
                    <hr class="hr-white animated fadeIn"/>
                    <p class="subtitle animated fadeInDown">
                      {durationOptions[appointment.duration]}
                    </p>
                    <p class="subtitle animated fadeInDown">{statusMap[appointment.status]}</p>
                    <div class="is-divider" data-content="OR"></div>

                    { addNote &&
                      <div class="control animated fadeIn">
                        <span class="icon is-small is-pulled-right" onClick={() => setaAddNote(!addNote)}>
                          <Icon path={mdiWindowClose} size={0.7} color="white"/>
                        </span>
                        <textarea class="textarea is-outlined" placeholder={appointment.note} onChange={({ target }) => setNote(target.value)}></textarea>
                        <br/>
                      </div>
                    }

                    { showNotes && <p class="subtitle animated fadeInDown">Note - {appointment.note}</p> }

                    <p class="buttons animated fadeInDown">
                      { !addNote ?
                        <a class="button is-primary is-inverted is-outlined" onClick={() => setaAddNote(!addNote)}>
                          <span>{ initialNote ? 'Edit Note' : 'Add Note' }</span>
                          <span class="icon is-small">
                            <Icon path={mdiPlus} size={0.7} color="white"/>
                          </span>
                        </a> :
                        <a class="button is-primary is-inverted is-outlined" onClick={() => handleClientUpdate()}>
                          <span>Save</span>
                          <span class="icon is-small">
                            <Icon path={mdiCheck} size={0.7} color="white"/>
                          </span>
                        </a>

                      }

                      <a class="button is-primary is-inverted is-outlined" onClick={() => toggleModal(_id)}>
                        <span>Cancel</span>
                        <span class="icon is-small">
                          <Icon path={mdiWindowClose} size={0.7} color="white"/>
                        </span>
                      </a>

                    </p>
                    </div>
                  }


                </article>
              </div>
            </div>
          </Fade>
        </li>
}

AppointmentItem.propTypes = {
  appointment: PropTypes.object,
  toggleModal: PropTypes.func
}
