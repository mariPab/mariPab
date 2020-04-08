import React from 'react';
import { shallow } from 'enzyme';
import { NavComponent } from './Nav';

const mockProps = {
  total: 40,
};

describe('Component Nav', () => {
  it('should render without crashing', () => {
    const component = shallow(<NavComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
