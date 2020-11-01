import React from 'react';
import { shallow } from 'enzyme';
import { Nav } from '.';

const mockProps = {
  total: 40,
};

describe('Component Nav', () => {
  it('should render without crashing', () => {
    const component = shallow(<Nav {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
