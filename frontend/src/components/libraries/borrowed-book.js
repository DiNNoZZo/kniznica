import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import sendRequest from '../../utils/send-request';
import findByNameItem from '../../utils/findByNameItem';
import Typography from '../ui/typography';
import Input from '../ui/input';
import Button from '../ui/button';
import classes from './borrowed-book.module.scss';

const domain = process.env.REACT_APP_DOMAIN;

function BorrowedBook({ booksProps, studentsProps }) {
  const params = useParams();
  const [books, setBooks] = useState(booksProps);
  const [students, setStudents] = useState(studentsProps);
  const [currTime, setCurrTime] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [maxTime, setMaxTime] = useState(
    new Date(Date.now() + 2592000000).toISOString().split('T')[0]
  );

  const submit = async (e) => {
    e.preventDefault();

    const student = findByNameItem(students, e.target[0].value);
    const book = findByNameItem(books, e.target[1].value);
    const returnTime = e.target[2].value;

    const bodyPost = {
      student: student.id,
      book: book.id,
      maxDays: returnTime,
      active: true,
    };

    try {
      await sendRequest({
        url: `${domain}/api/books/reader`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: bodyPost,
      });

      const { data } = await sendRequest({
        url: `${domain}/api/libraries/${params.id}`,
      });

      setBooks(data.books);
      setStudents(data.students);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (booksProps && studentsProps) {
      setBooks(booksProps);
      setStudents(studentsProps);
    }
  }, [booksProps, studentsProps, books]);

  return (
    <form onSubmit={submit} className={classes.form}>
      <Typography variant="h6" style={{ textAlign: 'center' }}>
        Borrowed book
      </Typography>
      <div className={classes.input}>
        <label htmlFor="student">Select a student.</label>
        <select placeholder="Student" name="student" id="student">
          {students.map((student) => (
            <option key={student.id}>{student.name}</option>
          ))}
        </select>
      </div>
      <div className={classes.input}>
        <label htmlFor="book">Select a book.</label>
        <select name="book" id="book">
          {books.map((book) => (
            <option key={book.id}>{book.name}</option>
          ))}
        </select>
      </div>
      <div className={classes.input}>
        <label htmlFor="date">Select a date.</label>
        <Input type="date" id="date" min={currTime} max={maxTime} required />
      </div>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}

export default BorrowedBook;
