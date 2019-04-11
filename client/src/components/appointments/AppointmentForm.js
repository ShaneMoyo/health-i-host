import React, { Component } from 'react';
import moment from 'moment'
import Select from 'react-select'
import DayPicker from 'react-day-picker';
import TimePicker from 'rc-time-picker';

import 'react-day-picker/lib/style.css';
import 'rc-time-picker/assets/index.css';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const format = 'h:mm a';

const now = moment().hour(0).minute(0);



export default class MyApp extends Component {
  state = {
    date: new Date()

  }

  onChange = date => {
    console.log("date", date);
    this.setState({ date })
  }

  render() {
    return (
      <section class="hero is-warning is-fullheight">
        <div class="column is-waring is-6 is-offset-3">
          <div class="box animated fadeIn is-warning" >
            <div class="field">
              <label class="label">Service</label>
              <Select options={options} />
            </div>
            <hr/>
            <div class="field">
              <label class="label">Date</label>
              <DayPicker />
            </div>
            <hr/>

            <div class="field">
              <label class="label">Time</label>
              <TimePicker
                 showSecond={false}
                 defaultValue={now}
                 className="xxx"
                 onChange={this.onChange}
                 format={format}
                 use12Hours
                 inputReadOnly
               />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
