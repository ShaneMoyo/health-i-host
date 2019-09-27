import React from 'react';
import { shallow } from 'enzyme';
import Auth from './Auth';
import Credentials from './Credentials';
import configureStore from 'redux-mock-store';

describe('Auth', () => {

  const initialState = {output:100}
  const mockStore = configureStore();
  let store,container

  beforeEach(()=>{
    store = mockStore(initialState)
    container = shallow(<ConnectedHome store={store} /> )
  })

  it('should render correctly Auth component', () => {
    const component = shallow(<Auth store={store}/>);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly Credentials component', () => {
    const component = shallow(<Credentials />);

    expect(component).toMatchSnapshot();
  });
});
