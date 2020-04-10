
import React from 'react';
import styles from './NumberInput.module.scss';
import PropTypes from 'prop-types';

const Component = ({ value, onChange }) => (
  <input
    type="number"
    min="1"
    max="10"
    value={value}
    onChange={onChange}
    className={styles.component}
  />
);

Component.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export {
  Component as NumberInput,
  Component as NumberInputComponent,
};
