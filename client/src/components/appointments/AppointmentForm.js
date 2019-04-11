import React, { Component } from 'react';
import moment from 'moment'
import Select from 'react-select'
import DayPicker from 'react-day-picker';
import TimePicker from 'rc-time-picker';

import 'react-day-picker/lib/style.css';
import 'rc-time-picker/assets/index.css';

export default class MyApp extends Component {
  state = {

  }

  getDate = () => {
    const now = moment().hour(0).minute(0);
    const { month, day, timeHour, timeMinutes } = this.state;
    if (!month || !day || !timeHour || !timeMinutes) {
      return now;
    } else {
      const newDate = new Date(2019, month, day, timeHour, timeMinutes);
      console.log('returning ', newDate);
      return newDate.toDateString()
    }
  }

  onDateChange = date => {
    if (!date) return
    this.setState({ month: date.getMonth(), day: date.getDate() })
  }

  onTimeChange = date => {
    if (!date) return
    this.setState({ timeMinutes: date.format("mm"), timeHour: date.format("hh"), ampm: date.format("a")})
  }

  handleSubmit = () => {

    console.log('appointment', this.getDate().toDateString())
  }

  render() {
    const now = moment().hour(0).minute(0);
    const selectedDates = this.getDate();
    const options = [
      { value: 'massage', label: 'Massage Therapy' },
      { value: 'mineral', label: 'Mineral Consultation' },
      { value: 'movement', label: 'Movement' }
    ];

    return (
      <section class="hero is-warning is-fullheight">
        <div class="column is-waring is-6 is-offset-3">
          <div class="box animated fadeIn is-warning" >
            <div class="animated fadeIn title is-4">Schedule an Appointment</div>

            <div class="field">
              <Select defaultValue="select a service" options={options} />
            </div>
            <hr/>
            <div class="field">

              <DayPicker onDayClick={this.onDateChange}/>
              <TimePicker
                 showSecond={false}
                 defaultValue={now}
                 className="xxx"
                 onChange={this.onTimeChange}
                 format='h:mm a'
                 use12Hours
                 inputReadOnly
               />
            </div>
            <hr/>
            <div class="field">
              <label class="label"></label>
              <button class="button is-medium is-info" onClick={this.handleSubmit}>Book Appointment</button>
            </div>

            <br/>

            <br/>
          </div>
        </div>
      </section>
    );
  }
}
