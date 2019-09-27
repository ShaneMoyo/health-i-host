import React from 'react';
import { shallow } from 'enzyme';
import AppointmentForm from './AppointmentForm';
import AppointmentItem from './AppointmentItem';
import BookedSuccessfull from './BookedSuccessfull';
import MyAppointments from './MyAppointments';

describe('AppointmentForm', () => {
  it('should render correctly AppointmentForm component', () => {
    const component = shallow(<AppointmentForm />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly AppointmentItem component', () => {
    const component = shallow(<AppointmentItem />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly MyAppointments component', () => {
    const component = shallow(<MyAppointments />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly BookedSuccessfull component', () => {
    const component = shallow(<BookedSuccessfull />);

    expect(component).toMatchSnapshot();
  });
});
