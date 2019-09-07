import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import Select from 'react-select'
import DayPicker from 'react-day-picker';
import TimePicker from 'rc-time-picker';
import { bookAppointment } from './actions';
import { NavLink } from 'react-router-dom';


import 'react-day-picker/lib/style.css';
import 'rc-time-picker/assets/index.css';

const NavBarLink = props => <NavLink {...props}
className="nav-link"
activeClassName="active"
/>;
class AppointmentForm extends Component {
  state = {
    date: moment(),
    type: 'massage',
    duration: 0.5,
    appoitmentBooked: false
  }

  onTypeChange = type => {
    this.setState({ type: type.value });
  }

  onDurationChange = duration => {
    this.setState({ durration: duration.value });
  }

  onDateChange = date => {
    if (!date) return;

    const { date: currentDate } = this.state;
    const newDate = moment(date);
    const day = newDate.date();
    const month = newDate.month();
    this.setState({ date: currentDate.date(day).month(month) })
  }

  onTimeChange = time => {
    if (!time) return;

    const { date: currentDate } = this.state;
    const newTime = moment(time);
    const day = newTime.hour();
    const month = newTime.minute();
    this.setState({ date: currentDate.hour(day).minute(month) })
  }

  handleSubmit = () => {
    const { date, type, duration } = this.state;
    const newAppointment = {
      date,
      type,
      duration,
      status: 'pending'
    }
    console.log('appointment', this.state);
    return this.props.bookAppointment(newAppointment)
      .then(() => {
        console.log('!this.state.appoitmentBooked: ', !this.state.appoitmentBooked)
        this.setState({ appoitmentBooked: !this.state.appoitmentBooked })
      })

  }

  render() {
    
    const typeOptions = [
      { value: 'massage', label: 'Massage Therapy' },
      { value: 'mineral', label: 'Mineral Consultation' },
      { value: 'movement', label: 'Movement' }
    ];
    const durationOptions = [
      { value: 0.5, label: '30 Minutes' },
      { value: 1, label: '1 Hour' },
      { value: 1.5, label: '1.5 Hours ' },
      { value: 2, label: '2 Hours' }
    ];

    return (
      <section class="hero is-warning is-fullheight">
        <div class="column is-waring is-6 is-offset-3">
          <div class="box animated fadeIn is-warning" >


              { this.state.appoitmentBooked ?
                <div>
                  <div class="animated fadeIn title is-6">Appointment Booked Succesfully</div>
                  <br/>
                  <div class="animated fadeIn button is-info is-large"><NavBarLink exact to="/appointment/me">Proceed to My Appointments</NavBarLink></div>
                </div> :
                <div>
                  <div class="animated fadeIn title is-4">Schedule an Appointment</div>
                  <div class="field">
                  <Select defaultValue="select a service" options={typeOptions} onChange={this.onTypeChange}/>
                  </div>
                  <hr/>

                  <div class="field">
                  <DayPicker onDayClick={this.onDateChange}/>
                  </div>
                  <div class="field">
                  <TimePicker
                  showSecond={false}
                  defaultValue={this.state.date}
                  className="xxx"
                  onChange={this.onTimeChange}
                  format='h:mm a'
                  use12Hours
                  inputReadOnly
                  />
                  </div>
                  <hr/>
                  <div class="field">
                  <Select defaultValue="select a service" options={durationOptions} onChange={this.onTypeChange}/>
                  </div>
                  <hr/>
                  <div class="field">
                  <label class="label"></label>
                  <button class="button is-medium is-info" onClick={this.handleSubmit}>Book Appointment</button>
                  </div>
                </div>
              }


              <br/>

            <br/>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(({ auth, loading }) => ({
  user: auth.user,
  loading
}), { bookAppointment }
)(AppointmentForm);
