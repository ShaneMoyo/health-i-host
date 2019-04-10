import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bookAppointment } from './actions';
import { NavLink } from 'react-router-dom';

const NavBarLink = props => <NavLink {...props} 
className="nav-link" 
activeClassName="active"
/>;

class AppointmentForm extends Component {

  state = {
    selectedMonth: 1,
    selectedMonthDayCount: 31,
    selectedDay: 1,
    addNote: false,
    appoitmentBooked: false
  }

  months = [
    { month: 'January', days: 31, index: 1 },
    { month: 'February ', days: 28, index: 2 },
    { month: 'March', days: 31, index: 3 },
    { month: 'April', days: 30, index: 4 },
    { month: 'May', days: 31, index: 5 },
    { month: 'June', days: 30, index: 6 },
    { month: 'July', days: 31, index: 7 },
    { month: 'August', days: 31, index: 8 },
    { month: 'September', days: 30, index: 9 },
    { month: 'October', days: 31, index: 10 },
    { month: 'November', days: 30, index: 11 },
    { month: 'December', days: 31, index: 12 }
  ]

  times = [
    '10:00 A.M.',
    '10:30 A.M.',
    '11:00 A.M.',
    '11:30 A.M.',
    '12:00 A.M.',
    '12:30 A.M.',
    '1:00 P.M.',
    '1:30 P.M.',
    '2:00 P.M.',
    '2:30 P.M.',
    '3:00 P.M.',
    '3:30 P.M.',
    '4:00 P.M.',
    '4:30 P.M.',
    '5:00 P.M.',
    '5:30 P.M.',
    '6:00 P.M.',
    '6:30 P.M.',
    '7:00 P.M.',
    '7:30 P.M.',
    '8:00 P.M.'
  ]

  handleMonthChange = month => {
    this.setState({ selectedMonth: month })
  }
  handleDayChange = day => {
    this.setState({ selectedDay: day })
  }
  handleAddNote = () => {
    this.setState({ addNote: !this.state.addNote })
  }
  handleBookAppointment = event => {
    
    event.preventDefault();
    const { selectedMonth: month, selectedDay: day } = this.state;
    const { elements } = event.target;
    const appointment = {
      date: `2018-${month}-${day}`,
      service: elements.service.value,
      user: this.props.user._id,
      fulfilled: false,
      time: elements.time.value
    }
    if(elements.note){
      
      appointment.notes = elements.note.value;
    };
    return this.props.bookAppointment(appointment)
      .then(() => {
        this.setState({ appoitmentBooked: !this.state.appoitmentBooked })
      })
  }

  
  render(){

    const monthOptions = this.months.map(month => {
      const option = this.state.selectedMonthDayCount === month.days ? 
      <option value={month.index} selected >{month.month}</option> : 
      <option value={month.index}>{month.month}</option>;
      return option;
    });

    
    const dayCount = this.months.filter(month => {
      return month.index == this.state.selectedMonth
    });

    let daysInMonth = [];

    for( let i = 1; i <= dayCount[0].days; i++){
      daysInMonth.push(i);
    }

    const dayOptions = daysInMonth.map(day => {
      const option = this.state.selectedDay === day ? 
      <option value={day} selected >{day}</option> : 
      <option value={day}>{day}</option>;
      return option;
    })

    const timeOptions = this.times.map(time => {
      return <option value={time}>{time}</option>; 
    });


    
    return(
      <section class="hero is-warning">
        <div class="hero-body">
          <div class="container has-text-centered">
            { this.state.appoitmentBooked ? 
            <div>
              <h3 class="animated fadeIn is-success">Appointment Booked Succesfully</h3>
              <div class="animated fadeIn button is-info is-large"><NavBarLink exact to="/appointment/me">Proceed to My Appointments</NavBarLink></div>
            </div> :
            <form onSubmit={ event => this.handleBookAppointment(event)}>
                <div class="field">
                  <div class="label">Appointment type</div>
                <div class="select is-large">
                  <select name="service">
                    <option value="Massage">Massage Therapy</option>
                    <option>With options</option>
                  </select>
                </div>
                </div>
                <div class="field">
                  <div class="label">Month</div>
                <div class="select is-large">
                  <select onChange={ ({ target }) => this.handleMonthChange(target.value) }>
                    {monthOptions}
                  </select>
                </div>
                </div>
                <div class="field">
                  <div class="label">Day</div>
                <div class="select is-large">
                  <select onChange={ ({ target }) => this.handleDayChange(target.value) }>
                    {dayOptions}
                  </select>
                </div>
                </div>
                <div class="field">
                  <div class="label">Time</div>
                <div class="select is-large">
                  <select name="time">
                    {timeOptions}
                  </select>
                </div>
                </div>
                <div class="field">
                  <label class="label">Message</label>
                  <div class="control has-text-centered">
                    { this.state.addNote ? 
                    <div>
                    <div class="button is-outlined is-dark" onClick={() => this.handleAddNote()}>x</div>
                    <br/>
                    <br/>
                    <textarea class="textarea" placeholder="Add note" name="note"></textarea>
                    </div> : 
                    <div class="button is-outlined is-dark" onClick={() => this.handleAddNote()}>Add a Note</div>}
                  </div>
                </div>
                <hr/>
                <div class="field">
                  <button class={ this.props.loading ? "button is-loading is-large is-outlined is-success" :  "button is-large is-outlined is-success"} type="submit">Book Appointment</button>
                </div>
            </form>}
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