import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import sendRequest from '../../utils/send-request';
import Typography from '../ui/typography';
import Article from '../ui/article';
import Button from '../ui/button';
import Link from '../ui/link';
import BorrowedBook from './borrowed-book';
import Title from '../title/title';
import classes from './detail-component-library.module.scss';

function ShowDetailLibrary({ library }) {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const params = useParams();

  const domain = process.env.REACT_APP_DOMAIN;

  const deleteItem = async (type, ItemId) => {
    try {
      await sendRequest({
        url: `${domain}/api/${type}/${ItemId}`,
        method: 'DELETE',
      });

      const { data } = await sendRequest({
        url: `${domain}/api/libraries/${params.id}`,
      });

      setStudents(data.students);
      setBooks(data.books);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (library) {
      setStudents(library.students);
      setBooks(library.books);
    }
  }, [library]);

  if (!library) {
    return (
      <Article>
        <Typography variant="h6">This library not found</Typography>
      </Article>
    );
  }

  let noData;
  if (!students.length > 0 && !books.length > 0) {
    noData = (
      <Typography style={{ textAlign: 'center' }} variant="h6">
        No data to display. Add students and books.
      </Typography>
    );
  }

  return (
    <Fragment>
      <Title title={library.name}>
        <Link href={`/libraries/${params.id}/create-student`}>
          <Button variant="primary">Add student</Button>
        </Link>
        <Link href={`/libraries/${params.id}/create-book`}>
          <Button variant="primary">Add book</Button>
        </Link>
        <Button
          variant="dangerous"
          onClick={deleteItem.bind(null, 'libraries', params.id)}
        >
          Delete
        </Button>
      </Title>
      <Article>
        {noData && noData}
        <div className={classes.wrapper}>
          <div className={classes.container}>
            {students.length > 0 && (
              <Fragment>
                <Typography variant="h6">Students</Typography>
                <ul>
                  {students.map((student) => (
                    <li key={student._id}>
                      <Typography variant="body1">
                        Name: {student.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        style={{ margin: '0.3rem 0' }}
                      >
                        Contact: {student.email}
                      </Typography>

                      <Typography variant="body2">
                        Book:{' '}
                        {student.reading?.book
                          ? student.reading.book.name
                          : 'none'}
                      </Typography>

                      <div className={classes.buttons}>
                        <Link href={`/students/${student.id}/detail`}>
                          <Button variant="primary">Detail</Button>
                        </Link>

                        <Button
                          variant="dangerous"
                          onClick={deleteItem.bind(
                            null,
                            'students',
                            student.id
                          )}
                        >
                          Delete
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </Fragment>
            )}
          </div>
          {books.length > 0 && (
            <div className={classes.container}>
              <Typography variant="h6">Books</Typography>
              <ul>
                {books.map((book) => (
                  <li key={book._id}>
                    <Typography variant="body1">Name: {book.name}</Typography>

                    <Typography variant="body2" style={{ margin: '0.3rem 0' }}>
                      Author: {book.writer}
                    </Typography>

                    <Typography variant="body2">
                      Reader:{' '}
                      {book.reader?.student ? book.reader.student.name : 'none'}
                    </Typography>
                    <div className={classes.buttons}>
                      <Link href={`/books/${book.id}/detail`}>
                        <Button variant="primary">Detail</Button>
                      </Link>

                      <Button
                        variant="dangerous"
                        onClick={deleteItem.bind(null, 'books', book.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Article>
      <Article>
        <BorrowedBook booksProps={books} studentsProps={students} />
      </Article>
    </Fragment>
  );
}

export default ShowDetailLibrary;
