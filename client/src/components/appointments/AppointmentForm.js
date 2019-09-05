import React, { Component } from 'react';
import moment from 'moment'
import Select from 'react-select'
import DayPicker from 'react-day-picker';
import TimePicker from 'rc-time-picker';

import 'react-day-picker/lib/style.css';
import 'rc-time-picker/assets/index.css';

export default class MyApp extends Component {
  state = {
    date: moment()
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
    console.log('appointment', this.state.date);
  }

  render() {
    const now = moment().hour(0).minute(0);
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
