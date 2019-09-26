import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment'
import Select from 'react-select'
import DayPicker from 'react-day-picker';
import TimePicker from 'rc-time-picker';
import { bookAppointment } from './actions';
import { NavLink, Redirect } from 'react-router-dom';
import 'react-day-picker/lib/style.css';
import 'rc-time-picker/assets/index.css';


const NavBarLink = props => <NavLink {...props} className="nav-link" activeClassName="active"/>;

export default function AppointmentForm() {

  const [date, setDate] = useState(moment());
  const [type, setType] = useState('massage');
  const [duration, setDuration] = useState(0.5);
  const [status, setStatus] = useState('pending');
  const [appoitmentBooked, setAppoitmentBooked] = useState(false);
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();


  const onDateChange = newDate => {
    if (!newDate) return;
    newDate = moment(newDate);
    const day = newDate.date();
    const month = newDate.month();
    setDate(date.date(day).month(month));
  }

  const onTimeChange = time => {
    if (!time) return;
    time = moment(time);
    const day = time.hour();
    const month = time.minute();
    setDate(date.hour(day).minute(month));

  }

  const handleSubmit = () => {
    return dispatch(bookAppointment({ date, type, status, duration })).then(() => setAppoitmentBooked(!appoitmentBooked))
  }

  const disabledHours = () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20, 21, 22, 23];


  const typeOptions = [
    { value: 'massage', label: 'Massage Therapy' },
    { value: 'mineral', label: 'Mineral Consultation' },
    { value: 'movement', label: 'Movement' }
  ];
  const durationOptions = [
    { value: 0.5, label: '30 Minutes' },
    { value: 1, label: '1 Hour' },
    { value: 1.5, label: '1 Hour 30 Minutes' },
    { value: 2, label: '2 Hours' }
  ];

  if (appoitmentBooked) { return <Redirect to='/appointment/booked'/> }

  return (
        <div class="container has-text-centered">
          <br/><br/>
          <section class="hero is-warning is-fullheight">
            <div class="column is-waring is-one-third is-offset-one-third">
              <div class="box animated fadeIn is-warning" >
                <div>
                  <div class="field">
                    <Select defaultValue={typeOptions[0]} options={typeOptions} onChange={({ value }) => setType(value)}/>
                  </div>

                  <div class="field">
                    <Select defaultValue={durationOptions[1]} options={durationOptions} onChange={({ value }) => setDuration(value)}/>
                  </div>

                  <div class="field">
                    <div calss="container">
                      <DayPicker onDayClick={onDateChange}/>
                    </div>
                  </div>
                  <div class="field">
                    <TimePicker
                    showSecond={false}
                    hideDisabledOptions={true}
                    defaultValue={date}
                    className="xxx"
                    onChange={onTimeChange}
                    disabledHours={disabledHours}
                    format='h:mm a'
                    minuteStep={30}
                    use12Hours
                    inputReadOnly
                    />
                  </div>
                  <hr/>
                  <div class="field">
                    <label class="label"></label>
                    <button class="button is-medium is-info" onClick={handleSubmit}>Book Appointment</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
  );
}
