import React, { useEffect, useCallback, useState, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import sendRequest from '../../utils/send-request';
import Student from '../sliceBookStudentHistory/student';
import History from '../sliceBookStudentHistory/history';
import Book from '../sliceBookStudentHistory/book';
import Title from '../title/title';
import Section from '../ui/section';
import Article from '../ui/article';
import Typography from '../ui/typography';
import Button from '../ui/button';
import Link from '../ui/link';

import classes from './student-style.module.scss';

const domain = process.env.REACT_APP_DOMAIN;

function DetailComponentStudent() {
  const params = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [book, setBook] = useState(null);
  const [history, setHistory] = useState(null);

  const returnBook = async () => {
    const sendBody = {
      student: params.id,
      book: book.id,
    };

    console.log(sendBody);

    const data = await sendRequest({
      url: `${domain}/api/books/reader`,
      method: 'DELETE',
      Headers: { 'Content-Type': 'application/json' },
      body: sendBody,
    });

    if (data.status === 'fail') {
      //show error
    }
  };

  const deleteItem = async () => {
    try {
      await sendRequest({
        url: `${domain}/api/students/${params.id}`,
        method: 'DELETE',
      });

      return navigate('/students');
    } catch (err) {
      console.log(err);
    }
  };

  const getData = useCallback(async () => {
    try {
      const { data } = await sendRequest({
        url: `${domain}/api/students/${params.id}`,
      });

      setStudent(data);
      setBook(data.reading.book);
      setHistory(data.history);
    } catch (err) {
      console.log(err);
    }
  }, [params.id]);

  console.log(student);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Section>
      <Title title={student?.name || 'Loading...'}>
        <Link href={`/students/${params.id}/update`}>
          <Button variant="primary">Update</Button>
        </Link>
        <Button variant="good" onClick={returnBook}>
          Return
        </Button>
        <Button variant="dangerous" onClick={deleteItem}>
          Delete
        </Button>
      </Title>
      {student && (
        <Fragment>
          <Article>
            <Typography variant="h6">Contact Information</Typography>
            <Student student={student} />
          </Article>
          <Article>
            <Typography variant="h6">Current book</Typography>
            {!book && (
              <div className={classes.text_area}>
                <Typography variant="body1">
                  He doesn't have a book yet.
                </Typography>
              </div>
            )}
            {book && <Book book={book} history={history} />}
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

export default DetailComponentStudent;
