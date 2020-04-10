import React from 'react';
import { shallow } from 'enzyme';
import { NumberInputComponent } from './NumberInput';

describe('Component NumberInput', () => {
  it('should render without crashing', () => {
    const component = shallow(<NumberInputComponent />);
    expect(component).toBeTruthy();
  });
});
