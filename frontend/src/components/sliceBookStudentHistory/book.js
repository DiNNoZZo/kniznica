import React from 'react';
import Typography from '../ui/typography';
import classes from './slice.module.scss';

function Book({ book, history }) {
  let fromDate, toDate;
  if (history?.length > 0) {
    fromDate = history ? new Date(history[0]?.take).toLocaleDateString() : '';
    toDate = history ? new Date(history[0]?.maxDays).toLocaleDateString() : '';
  }

  return (
    <div className={classes.text_area}>
      <Typography variant="body1">Author: {book.writer}</Typography>
      <Typography variant="body1">Name: {book.name}</Typography>
      <Typography variant="body1">Pages: {book.pages}</Typography>
      {fromDate && (
        <Typography variant="body2">Borrowed from: {fromDate}</Typography>
      )}
      {toDate && <Typography variant="body2">Borrowed to: {toDate}</Typography>}
    </div>
  );
}

export default Book;
