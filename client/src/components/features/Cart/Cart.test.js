import React from 'react';
import { shallow } from 'enzyme';
import { CartComponent } from './Cart';

const mockProps = {
  order: {
    products: [{
      name: 'cosmetic name',
      images: ['anc.jpeg'],
      manufacturer: 'manuf',
      price: 40,
    }],
    total: 40,
  },
};
describe('Component Cart', () => {
  it('should render without crashing', () => {
    const component = shallow(<CartComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
