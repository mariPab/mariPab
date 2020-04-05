import React from 'react';
import { shallow } from 'enzyme';
import { ProductComponent } from './Product';

const mockProps = {
  _id: '46346346',
  name: 'Lorem ipsum',
  manufacturer: 'Lorem ipsum',
  description: 'Lorem ipsum dolor sit amet',
  images: ['abc.jpg', 'bdc.jpg'],
  price: 27,
  match: {
    params: {
      id: '46346346',
    },
  },
  loadProduct: jest.fn(),
  addToCart: jest.fn(),
};

describe('Component Product', () => {
  it('should render without crashing', () => {
    const component = shallow(<ProductComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
