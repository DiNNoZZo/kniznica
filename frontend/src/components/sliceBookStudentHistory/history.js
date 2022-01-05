import React from 'react';
import Typofraphy from '../ui/typography';
import classes from './slice.module.scss';

function History({ history }) {
  return (
    <div className={classes.history}>
      <div className={classes.text_area}>
        <Typofraphy variant="body1">
          Book author: {history.book.writer}
        </Typofraphy>
        <Typofraphy variant="body1">Book title: {history.book.name}</Typofraphy>

        <Typofraphy variant="body2">
          Borrowed from: {new Date(history.take).toLocaleDateString()}
        </Typofraphy>

        <Typofraphy variant="body2">
          Borrowed to: {new Date(history.maxDays).toLocaleDateString()}
        </Typofraphy>
      </div>
    </div>
  );
}

export default History;
