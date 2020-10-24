import React from 'react';
import { shallow } from 'enzyme';
import { GalleryPic } from '.';

describe('Component GalleryPic', () => {
  it('should render without crashing', () => {
    const component = shallow(<GalleryPic src="abc.jpg" alt="picture" />);
    expect(component).toBeTruthy();
  });
});
