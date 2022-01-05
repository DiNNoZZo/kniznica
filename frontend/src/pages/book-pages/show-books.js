import React, { useState, useCallback, useEffect } from 'react';
import AllBooks from '../../components/books/all-books';
import sendRequest from '../../utils/send-request';
import Section from '../../components/ui/section';
import Article from '../../components/ui/article';
import Title from '../../components/title/title';

const domain = process.env.REACT_APP_DOMAIN;

function ShowBooks() {
  const [books, setBooks] = useState([]);

  const getData = useCallback(async () => {
    try {
      const { data } = await sendRequest({
        url: `${domain}/api/books`,
      });

      setBooks(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Section>
      <Title title="All Books" />
      <Article>
        <AllBooks books={books} />
      </Article>
    </Section>
  );
}

export default ShowBooks;
