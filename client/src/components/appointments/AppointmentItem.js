import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateAppointment } from './actions';
import moment from 'moment'
import DateTimePicker from 'react-datetime-picker';
import Fade from 'react-reveal/Fade';
import Icon from '@mdi/react'
import {  mdiDotsHorizontal, mdiCommentProcessingOutline, mdiPencilOutline, mdiWindowClose } from '@mdi/js'


function AppointmentItem (props){

  const { appointment, loading, toggleModal } = props;
  const { note: initialNote, date: initialDate, status, type, _id } = appointment;
  const [note, setNote] = useState(initialNote);
  const [date, setDate] = useState(initialDate);
  const [addNote, setaAddNote] = useState(false);
  const [editDate, setEditDate] = useState(false);
  const [edit, setEdit] = useState(false);
  const showNotes = initialNote && !addNote;

  const handleClientUpdate = () => {
    return props.updateAppointment({ ...appointment, date, note })
    .then(()=> {
      setaAddNote(false);
      setEditDate(false);
    })
  }

  const capatilizedType = appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)
  const colorMap = {
    massage: 'success',
    movement: 'primary',
    mineral: 'warning'
  }
  const color = colorMap[appointment.type];
  const className = `tile is-child notification has-text-white is-${color}`

  // const old = (
  //   <li class="message is-warning animated slideInUp">
  //     <Fade>
  //       <div >
  //         <div class="message-header">
  //           <span class="tag is-info">{status}</span>
  //           <button onClick={() => toggleModal(_id)} class="delete" aria-label="delete"></button>
  //         </div>
  //
  //         <div class="message-body">
  //           <div class="field is-grouped is-grouped-multiline">
  //
  //           <div class="control">
  //             <div class="tags has-addons">
  //               <span class="tag is-warning">Service type</span>
  //               <span class="tag is-info">{type}</span>
  //             </div>
  //           </div>
  //
  //             <div class="control">
  //               <div class="tags has-addons">
  //                 <span class="tag is-warning">Date</span>
  //                 { !editDate &&
  //                   <span onClick={() => setEditDate(!editDate)}class="tag is-info animated fadeIn">
  //                     {moment(date).format('MM/DD/YYYY hh:mm a')}
  //                   </span> }
  //                 { editDate &&
  //                   <span class="tag is-info ">
  //                     <DateTimePicker
  //                       clearIcon={null}
  //                       calendarIcon={null}
  //                       onChange={setDate}
  //                       disableClock={true}
  //                       disableCalendar={true}
  //                       value={new Date(date)}
  //                     />
  //                   </span>}
  //               </div>
  //             </div>
  //
  //             <br/>
  //           </div>
  //
  //           { addNote &&
  //             <div class="message is-info">
  //               <div class="message-header is-info">
  //                 Notes
  //               </div>
  //               <div class="animated fadeIn message-body is-info">
  //                 <textarea
  //                   class="textarea"
  //                   placeholder={initialNote ? JSON.stringify(initialNote) :"Add note"}
  //                   name="note" onChange={({ target }) => setNote(target.value)}>
  //                 </textarea>
  //               </div>
  //             </div> }
  //
  //         { showNotes ?
  //           <div>
  //             <article class="message is-info">
  //               <div class="message-header is-info">Notes</div>
  //               <div class="message-body is-info">{initialNote}</div>
  //             </article>
  //           </div> : null }
  //         <hr/>
  //
  //         <div class="buttons is-centered">
  //           { showNotes ?
  //             <div class="button is-small is-info is-outlined" onClick={() => setaAddNote(!addNote)}>{ initialNote ? 'Edit Note' : 'Add Note' }</div> :
  //             <div class={ loading ? "button is-loading is-info is-outlined" : "button is-small is-info is-outlined" } onClick={() => setaAddNote(!addNote)}>Cancel</div> }
  //             <div class={ loading ? "button is-loading is-info is-outlined" : "button is-small is-info is-outlined" } onClick={() => handleClientUpdate()}>Save Changes</div>
  //         </div>
  //       </div>
  //     </div>
  //   </Fade>
  // </li>
  // )

  return <li>
          <Fade>
            <div>

            <div class="tile is-parent is-vertical">
              <article class={className}>

                <span class="icon has-text-info is-pulled-right animated fadeIn" onClick={() => setEdit(!edit)}>
                  <i class="fas fa-info-circle animated fadeIn">
                  <Icon path={ edit ? mdiWindowClose : mdiDotsHorizontal}
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
                  <hr/>
                  <p class="subtitle">{moment(appointment.date).format('MM/DD/YYYY hh:mm a')}</p>
              </article>
            </div>
            </div>
          </Fade>
        </li>

}

export default connect(({ auth, loading }) => ({
  loading,
}), { updateAppointment }
)(AppointmentItem);
