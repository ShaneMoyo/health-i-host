import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAppointment } from './actions';

class ClientAppointmentItem extends Component{

  state = {
    inputNote: false,
    newNote: '',
    cancel: false
  }

  handleCancel = () => {
    this.setState({ cancel: true })
    this.handleClientUpdate();
  }

  handleInputNote = () => {
    this.setState({ inputNote: !this.state.inputNote })
  }

  handleNewNote = value => {
    console.log('newNote', value)
    this.setState({ newNote: value })
  }

  handleClientUpdate = cancel => {
    const update = { ...this.props.appointment }
    if(cancel) {
      update.cancelled = true
    }
    if(this.state.newNote !== '') {
      update.notes = this.state.newNote
    }
    return this.props.updateAppointment(update)
      .then(()=> { !cancel && this.setState({ inputNote: !this.state.inputNote })})

  }
  
  render(){
    const { appointment, loading } = this.props;
    let status = appointment.fulfilled ? 'Confirmed' : 'Pending';
    appointment.cancelled ? status = 'Cancelled' : null;
    return(
      <article class="animated slideInUp message is-warning">
        <div class="message-header">
          Service type: {appointment.service}
          <button onClick={() => this.handleClientUpdate(true)} class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
          <div class="field is-grouped is-grouped-multiline">

            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-warning">Date</span>
                <span class="tag is-info">{appointment.date}</span>
              </div>
            </div>

            <br/>
            
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-warning">Status</span>
                <span class={!appointment.fulfilled ? "tag is-success" : "tag is-danger"}>{status}</span>
              </div>
            </div>

          </div>
          { this.state.inputNote ? 
          <div class="message is-info">
            <div class="message-header is-info">
              Notes
              <button onClick={() => this.handleInputNote()} class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body is-info">
              <textarea class="textarea" placeholder={appointment.notes ? JSON.stringify(appointment.notes) :"Add note"} name="note" onChange={({ target }) => this.handleNewNote(target.value)}></textarea>
            </div>
          </div> : null }

        { appointment.notes && !this.state.inputNote ? 
        <div>
          <article class="message is-info">
            <div class="message-header is-info">Notes</div>
            <div class="message-body is-info">{appointment.notes}</div>
          </article> 
          <hr/>
        </div> : null }

        { !this.state.inputNote ? 
        <div class="button is-info is-outlined" onClick={() => this.handleInputNote()}>{appointment.notes ? 'Edit Note' : 'Add Note'}</div> :
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