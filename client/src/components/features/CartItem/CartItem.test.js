import React from 'react';
import { shallow } from 'enzyme';
import { CartItem } from '.';

const mockProps = {
  id: '463b36',
  product: {
    name: 'cosmetic name',
    images: ['anc.jpeg'],
    price: 40,
  },
  changeAmount: jest.fn(),
  removeProduct: jest.fn(),
};

describe('Component CartItem', () => {
  it('should render without crashing', () => {
    const component = shallow(<CartItem {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
