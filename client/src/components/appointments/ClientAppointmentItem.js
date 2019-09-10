import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAppointment } from './actions';
import moment from 'moment'
import DateTimePicker from 'react-datetime-picker';

class ClientAppointmentItem extends Component{

  state = {
    editDate: false,
    showCancelModal: false,
    addNote: false,
    newNote: '',
    date: this.props.appointment.date
  }

  handleCancelSubmit = () => {
    const update = { ...this.props.appointment }
    update.status = "cancelled";
    return this.props.updateAppointment(update)
      .then(()=> { this.setState({ showCancelModal: false })})
  }

  toggleModal = () => {
    this.setState({ showCancelModal: !this.state.showCancelModal });
  }

  editDate = () => {
    this.setState({ editDate: !this.state.editDate });
  }
  handleInputNote = () => {
    this.setState({ addNote: !this.state.addNote })
  }
  newDate = (date) => {
    if (!date) return;
    console.log('date: ', date);
    this.setState({ date: moment(date) })
  }

  handleNewNote = value => {
    this.setState({ newNote: value })
  }

  handleClientUpdate = () => {
    const update = { ...this.props.appointment }
    if(this.state.newNote !== '') {
      console.log('new Note')
      update.note = this.state.newNote
    }
    if(this.state.status === 'cancelled') {
      console.log('here in the conditional ')
      update.status = 'cancelled';
    }

    if(this.state.date !== update.date) {
      update.date = this.state.date;
    }
    return this.props.updateAppointment(update)
      .then(()=> { this.setState({ addNote: false, editDate: false })})
  }

  render(){
    const { appointment, loading } = this.props;
    //console.log('appointment: ', appointment);
    let status = appointment.status;
    appointment.cancelled ? status = 'Cancelled' : null;
    return(
      <article class="animated slideInUp message is-warning">
        <div class="message-header">

            <span class="tag is-info">{status}</span>


          <button onClick={() => this.toggleModal()} class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
          <div class="field is-grouped is-grouped-multiline">

          <div class="control">
            <div class="tags has-addons">
              <span class="tag is-warning">Service type</span>
              <span class={!appointment.fulfilled ? "tag is-success" : "tag is-danger"}>{appointment.type}</span>
            </div>
          </div>
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-warning">Date</span>
                {!this.state.editDate && <span onClick={() => this.editDate()}class="tag is-info">{moment(this.state.date).format('MM/DD/YYYY hh:mm a')}</span>}
                {this.state.editDate && <span class="tag is-info">
                  <DateTimePicker
                    clearIcon={null}
                    calendarIcon={null}
                    onChange={this.newDate}
                    disableClock={true}
                    disableCalendar={true}
                    value={new Date(this.state.date)}
                  />
                </span>}
              </div>
            </div>

            <br/>


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
                  <button onClick={() => this.handleCancelSubmit()} class="button is-danger">Cancel</button>
                </footer>
              </div>
            </div>

          </div>
          { this.state.addNote ?
          <div class="message is-info">
            <div class="message-header is-info">
              Notes
            </div>
            <div class="message-body is-info">
              <textarea class="textarea" placeholder={appointment.note ? JSON.stringify(appointment.note) :"Add note"} name="note" onChange={({ target }) => this.handleNewNote(target.value)}></textarea>
            </div>
          </div> : null }

        { appointment.note && !this.state.addNote ?
        <div>
          <article class="message is-info">
            <div class="message-header is-info">Notes</div>
            <div class="message-body is-info">{appointment.note}</div>
          </article>
        </div> : null }
        <hr/>

        <div class="buttons is-centered">
          { !this.state.addNote ?
          <div class="button is-info is-outlined" onClick={() => this.handleInputNote()}>{appointment.note ? 'Edit Note' : 'Add Note'}</div> :
          <div class={ loading ?"button is-loading is-info is-outlined" : "button is-info is-outlined"} onClick={() => this.handleInputNote()}>Cancel</div> }
          <div class="button is-info is-outlined" onClick={() => this.handleClientUpdate()}>Save Changes</div>
        </div>
      </div>
    </article>
    )
  }
}

export default connect(({ auth, loading }) => ({
  user: auth.user,
  loading,
}), { updateAppointment }
)(ClientAppointmentItem);
