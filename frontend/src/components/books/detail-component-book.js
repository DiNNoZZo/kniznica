import React, { useEffect, useCallback, useState, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Student from '../sliceBookStudentHistory/student';
import History from '../sliceBookStudentHistory/history';
import Book from '../sliceBookStudentHistory/book';
import sendRequest from '../../utils/send-request';
import Section from '../ui/section';
import Article from '../ui/article';
import Typography from '../ui/typography';
import Button from '../ui/button';
import Link from '../ui/link';
import Title from '../title/title';
import classes from './detail-component-book.module.scss';

const domain = process.env.REACT_APP_DOMAIN;

function DetailComponentBook() {
  const params = useParams();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [student, setStudent] = useState(null);
  const [book, setBook] = useState(null);
  const [history, setHistory] = useState(null);

  const returnBook = async () => {
    //not working yet
    const sendBody = {
      student: params.id,
      book: book.id,
    };

    const data = await sendRequest({
      url: `${domain}/api/books/reader`,
      method: 'DELETE',
      Headers: { 'Content-Type': 'application/json' },
      body: sendBody,
    });

    if (data.status === 'fail') {
      //set popup window with error..
    }

    setRefresh(!refresh);
  };

  const deleteItem = async () => {
    try {
      await sendRequest({
        url: `${domain}/api/books/${params.id}`,
        method: 'DELETE',
      });

      return navigate('/books');
    } catch (err) {
      console.log(err);
    }
  };

  const getData = useCallback(async () => {
    try {
      const { data } = await sendRequest({
        url: `${domain}/api/books/${params.id}`,
      });

      setBook(data);
      setStudent(data.reader.student);
      setHistory(data.history);
    } catch (err) {
      console.log(err);
    }
  }, [params.id]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Section>
      <Title title={book?.name || 'Loading...'}>
        <Link href={`/books/${params.id}/update`}>
          <Button variant="primary">Update</Button>
        </Link>
        <Button variant="good" onClick={returnBook}>
          Return
        </Button>
        <Button variant="dangerous" onClick={deleteItem}>
          Delete
        </Button>
      </Title>
      {book && (
        <Fragment>
          <Article>
            <Typography variant="h6">Book information</Typography>
            <Book book={book} history={history} />
          </Article>
          <Article>
            <Typography variant="h6">Current reader - student</Typography>
            {!student && (
              <div className={classes.text_area}>
                <Typography variant="body1">
                  No one is reading this book yet.
                </Typography>
              </div>
            )}
            {student && (
              <Student student={student} library={book.library.name} />
            )}
          </Article>
          <Article>
            <Typography variant="h6">History</Typography>
            {!history ||
              (!history.length > 0 && (
                <div className={classes.text_area}>
                  <Typography variant="body1">
                    He has no history yet.
                  </Typography>
                </div>
              ))}
            {history &&
              history.map((el) => <History key={el.id} history={el} />)}
          </Article>
        </Fragment>
      )}
    </Section>
  );
}

export default DetailComponentBook;
