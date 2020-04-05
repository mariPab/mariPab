import React from 'react';
import { shallow } from 'enzyme';
import { GalleryPicComponent } from './GalleryPic';

describe('Component GalleryPic', () => {
  it('should render without crashing', () => {
    const component = shallow(<GalleryPicComponent src="abc.jpg" />);
    expect(component).toBeTruthy();
  });
});
