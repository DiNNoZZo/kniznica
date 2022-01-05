import React from 'react';

import classes from './section.module.scss';

function Section({ children, styleClass }) {
  const classStyles = styleClass
    ? `${classes.section} ${styleClass}`
    : `${classes.section}`;

  return <section className={classStyles}>{children}</section>;
}

export default Section;
