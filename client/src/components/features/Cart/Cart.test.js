import React from 'react';
import { shallow } from 'enzyme';
import { CartComponent } from './Cart';

const mockProps = {
  cart: {
    products: [{
      name: 'cosmetic name',
      images: ['anc.jpeg'],
      price: 40,
    }],
    total: 40,
    expanded: true,
  },
};
describe('Component Cart', () => {
  it('should render without crashing', () => {
    const component = shallow(<CartComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
