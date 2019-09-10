import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAppointment } from './actions';
import moment from 'moment'

class ClientAppointmentItem extends Component{

  state = {
    showCancelModal: false,
    addNote: false,
    newNote: '',
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

  handleInputNote = () => {
    this.setState({ addNote: !this.state.addNote })
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
    return this.props.updateAppointment(update)
      .then(()=> { this.setState({ addNote: false })})
  }

  render(){
    const { appointment, loading } = this.props;
    //console.log('appointment: ', appointment);
    let status = appointment.status;
    appointment.cancelled ? status = 'Cancelled' : null;
    return(
      <article class="animated slideInUp message is-warning">
        <div class="message-header">
          Service type: {appointment.type}
          <button onClick={() => this.toggleModal()} class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
          <div class="field is-grouped is-grouped-multiline">

            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-warning">Date</span>
                <span class="tag is-info">{moment(appointment.date).format('MM/DD/YYYY hh:mm a')}</span>
              </div>
            </div>

            <br/>

            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-warning">Status</span>
                <span class={!appointment.fulfilled ? "tag is-success" : "tag is-danger"}>{status}</span>
              </div>
            </div>

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
              <button onClick={() => this.handleInputNote()} class="delete" aria-label="delete"></button>
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
          <hr/>
        </div> : null }

        { !this.state.addNote ?
        <div class="button is-info is-outlined" onClick={() => this.handleInputNote()}>{appointment.note ? 'Edit Note' : 'Add Note'}</div> :
        <div class={ loading ?"button is-loading is-info is-outlined" : "button is-info is-outlined"} onClick={() => this.handleClientUpdate()}>Submit Note</div> }

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
