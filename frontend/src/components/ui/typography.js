import React from 'react';

import classes from './typography.module.scss';

function Title({ variant, children, ...otherProps }) {
  if (variant === 'h1') {
    return (
      <h1 className={classes.h1} {...otherProps}>
        {children}
      </h1>
    );
  }

  if (variant === 'h2') {
    return (
      <h2 className={classes.h2} {...otherProps}>
        {children}
      </h2>
    );
  }

  if (variant === 'h3') {
    return (
      <h3 className={classes.h3} {...otherProps}>
        {children}
      </h3>
    );
  }

  if (variant === 'h4') {
    return (
      <h4 className={classes.h4} {...otherProps}>
        {children}
      </h4>
    );
  }

  if (variant === 'h5') {
    return (
      <h5 className={classes.h5} {...otherProps}>
        {children}
      </h5>
    );
  }

  if (variant === 'h6') {
    return (
      <h6 className={classes.h6} {...otherProps}>
        {children}
      </h6>
    );
  }
  if (variant === 'body1') {
    return (
      <p className={classes.body1} {...otherProps}>
        {children}
      </p>
    );
  }
  if (variant === 'body2') {
    return (
      <p className={classes.body2} {...otherProps}>
        {children}
      </p>
    );
  }
  if (variant === 'subtitle1') {
    return (
      <p className={classes.subtitle1} {...otherProps}>
        {children}
      </p>
    );
  }
  if (variant === 'subtitle2') {
    return (
      <p className={classes.subtitle2} {...otherProps}>
        {children}
      </p>
    );
  }
  if (variant === 'error') {
    return (
      <p className={classes.error} {...otherProps}>
        {children}
      </p>
    );
  }

  return <h6>this variant not exist</h6>;
}

export default Title;
