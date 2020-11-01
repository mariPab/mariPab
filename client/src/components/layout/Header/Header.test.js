import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '.';

describe('Component Header', () => {
  it('should render without crashing', () => {
    const component = shallow(<Header />);
    expect(component).toBeTruthy();
  });
});
