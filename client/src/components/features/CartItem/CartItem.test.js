import React from 'react';
import { shallow } from 'enzyme';
import { CartItemComponent } from './CartItem';

const mockProps = {
  id: '463b36',
  product: {
    name: 'cosmetic name',
    images: ['anc.jpeg'],
    manufacturer: 'manuf',
    price: 40,
  },
};

describe('Component CartItem', () => {
  it('should render without crashing', () => {
    const component = shallow(<CartItemComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
