import React from 'react';

import classes from './button.module.scss';

function Button({ type, children, variant, ...otherProps }) {
  return (
    <button
      className={`${classes.button} ${classes[`button--${variant}`]}`}
      type={type}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
