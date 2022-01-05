import React from 'react';
import Typography from '../ui/typography';
import Button from '../ui/button';
import Link from '../ui/link';
import classes from './all-books.module.scss';

function AllBooks({ books }) {
  if (!books.length > 0) {
    return <Typography variant="h6">There are no books here yet.</Typography>;
  }

  return (
    <div className={classes.container}>
      <ul>
        {books.length > 0 &&
          books.map((book) => (
            <li key={book.id}>
              <div className={classes.text_area}>
                <Typography variant="body1">Author: {book.writer}</Typography>

                <Typography variant="body2">Title: {book.name}</Typography>

                <Typography variant="body2">
                  Library: {book.library.name}
                </Typography>

                <Typography variant="body2">
                  Reader:{' '}
                  {book.reader.active ? book.reader.student.name : 'none'}
                </Typography>
              </div>
              <div className={classes.buttons}>
                <Link href={`/books/${book.id}/detail`}>
                  <Button variant="primary">Detail</Button>
                </Link>

                <Link href={`/books/${book.id}/update`}>
                  <Button variant="primary">Update</Button>
                </Link>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AllBooks;
