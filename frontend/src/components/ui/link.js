import React from 'react';
import { Link as RLink } from 'react-router-dom';

function Link({ href, children, ...otherProps }) {
  return (
    <RLink to={href} {...otherProps}>
      {children}
    </RLink>
  );
}

export default Link;
