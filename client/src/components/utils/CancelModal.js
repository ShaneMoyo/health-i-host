import React, { Component } from 'react';

export default class CancelModal extends Component {


  render() {
    console.log('state: ', this.state, 'props: ', this.props)
    return(
      <div class={this.props.showCancelModal ? "modal is-active animated fadeIn" : "modal" }>
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title"></p>
            <button  onClick={() => this.props.toggleModal()}class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            Are you sure you want to cancel? Once cancelled the appointment must be rescheduled if you change you mind.
          </section>
          <footer class="modal-card-foot">
            <button onClick={() => this.props.handleDeleteAppointment()} class="button is-primary">Cancel Appointment</button>
          </footer>
        </div>
      </div>)
  }
}
