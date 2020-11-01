import React from 'react';
import { shallow } from 'enzyme';
import { MainLayout } from '.';

describe('Component MainLayout', () => {
  it('should render without crashing', () => {
    const component = shallow(<MainLayout />);
    expect(component).toBeTruthy();
  });
});
