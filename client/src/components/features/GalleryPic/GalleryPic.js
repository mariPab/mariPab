import React from 'react';
import PropTypes from 'prop-types';

import styles from './GalleryPic.module.scss';

const Component = ({ alt, src }) => (
  <div className={styles.picture}>
    <img alt={alt} src={src} />
  </div>
);

Component.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
};

export {
  Component as GalleryPic,
  Component as GalleryPicComponent,
};
