import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAppointment } from './actions';
import moment from 'moment'
import DateTimePicker from 'react-datetime-picker';

class ClientAppointmentItem extends Component{

  state = {
    editDate: false,
    addNote: false,
    note: this.props.appointment.note,
    date: this.props.appointment.date
  }

  editDate = () => this.setState({ editDate: !this.state.editDate });
  handleInputNote = () => this.setState({ addNote: !this.state.addNote })
  newDate = (date) => date && this.setState({ date: moment(date) })
  handleNewNote = value => this.setState({ note: value })

  handleClientUpdate = () => {
    const { note, date } = this.state;
    const update = { ...this.props.appointment, date, note }
    return this.props.updateAppointment(update).then(()=> { this.setState({ addNote: false, editDate: false })})
  }

  render(){
    const { appointment, loading, toggleModal } = this.props;
    const { date, editDate, addNote } = this.state;

    return(
      <article class="animated slideInUp message is-warning">
        <div class="message-header">
          <span class="tag is-info">{appointment.status}</span>
          <button onClick={() => toggleModal(appointment._id)} class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
          <div class="field is-grouped is-grouped-multiline">
          <div class="control">
            <div class="tags has-addons">
              <span class="tag is-warning">Service type</span>
              <span class="tag is-success">{appointment.type}</span>
            </div>
          </div>
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-warning">Date</span>
                { !editDate &&
                  <span onClick={() => this.editDate()}class="tag is-info">
                    {moment(date).format('MM/DD/YYYY hh:mm a')}
                  </span>}
                { editDate &&
                  <span class="tag is-info">
                    <DateTimePicker
                      clearIcon={null}
                      calendarIcon={null}
                      onChange={this.newDate}
                      disableClock={true}
                      disableCalendar={true}
                      value={new Date(date)}
                    />
                  </span>}
              </div>
            </div>
            <br/>
          </div>

          { addNote &&
            <div class="message is-info">
              <div class="message-header is-info">
                Notes
              </div>
              <div class="message-body is-info">
                <textarea
                  class="textarea"
                  placeholder={appointment.note ? JSON.stringify(appointment.note) :"Add note"}
                  name="note" onChange={({ target }) => this.handleNewNote(target.value)}>
                </textarea>
              </div>
            </div> }

        { appointment.note && !addNote ?
          <div>
            <article class="message is-info">
              <div class="message-header is-info">Notes</div>
              <div class="message-body is-info">{appointment.note}</div>
            </article>
          </div> : null }
        <hr/>

        <div class="buttons is-centered">
          { !addNote ?
            <div class="button is-info is-outlined" onClick={() => this.handleInputNote()}>{appointment.note ? 'Edit Note' : 'Add Note'}</div> :
            <div class={ loading ?"button is-loading is-info is-outlined" : "button is-info is-outlined"} onClick={() => this.handleInputNote()}>Cancel</div> }
            <div class={ loading ?"button is-loading is-info is-outlined" : "button is-info is-outlined"} onClick={() => this.handleClientUpdate()}>Save Changes</div>
        </div>
      </div>
    </article>
    )
  }
}

export default connect(({ auth, loading }) => ({
  loading,
}), { updateAppointment }
)(ClientAppointmentItem);
