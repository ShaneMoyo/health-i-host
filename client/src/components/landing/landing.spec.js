import React from 'react';
import { shallow } from 'enzyme';
import Landing from './landing';
import LandingMain from './LandingMain';
import ScheduleAppointment from './ScheduleAppointment';
import ServiceTile from './ServiceTile';


describe('Landing', () => {
  it('should render correctly Landing component', () => {
    const component = shallow(<Landing />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly LandingMain component', () => {
    const component = shallow(<LandingMain />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly LandingMain component', () => {
    const component = shallow(<LandingMain />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly ScheduleAppointment component', () => {
    const component = shallow(<ScheduleAppointment />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly ServiceTile component', () => {
    const component = shallow(<ServiceTile />);

    expect(component).toMatchSnapshot();
  });

});
