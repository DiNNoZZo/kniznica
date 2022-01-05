import React from 'react';
import Typography from '../ui/typography';
import classes from './title.module.scss';

function Title({ title, children }) {
  return (
    <div className={classes.lib_nav}>
      <div className={classes.lib_nav_item}>
        <Typography variant="h4">{title}</Typography>
      </div>
      <div className={classes.buttons}>{children}</div>
    </div>
  );
}

export default Title;
