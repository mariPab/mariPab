import React from 'react';
import { shallow } from 'enzyme';
import { ProductCardComponent } from './ProductCard';

const mockProps = {
  _id: '463b36',
  name: 'cosmetic name',
  images: ['anc.jpeg'],
  price: 40,
};
describe('Component ProductCard', () => {
  it('should render without crashing', () => {
    const component = shallow(<ProductCardComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
