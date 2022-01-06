import React from 'react';
import Typography from '../ui/typography';
import classes from './slice.module.scss';

function Student({ student, library }) {
  return (
    <div className={classes.text_area}>
      <Typography variant="body2">Name: {student.name}</Typography>
      <Typography variant="body2">Email: {student.email}</Typography>
      <Typography variant="body2">
        Library: {student.library?.name || library}
      </Typography>
    </div>
  );
}

export default Student;
