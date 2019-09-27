import React from 'react';
import { shallow } from 'enzyme';
import Massage from './Massage';
describe('Massage', () => {
  it('should render correctly massage component', () => {
    const component = shallow(<Massage />);

    expect(component).toMatchSnapshot();
  });
});
