import React from 'react';
import { shallow } from 'enzyme';
import { ProductCard } from '.';

const mockProps = {
  id: '463b36',
  name: 'cosmetic name',
  images: ['anc.jpeg'],
  price: 40,
};
describe('Component ProductCard', () => {
  it('should render without crashing', () => {
    const component = shallow(<ProductCard {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
