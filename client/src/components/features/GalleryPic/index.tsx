import React from 'react';
import styles from './GalleryPic.module.scss';

interface Props {
  alt: string;
  src: string;
}

export const GalleryPic: React.FunctionComponent<Props> = ({ alt, src }: Props) => (
  <div className={styles.picture}>
    <img alt={alt} src={src} />
  </div>
);

export default GalleryPic;
