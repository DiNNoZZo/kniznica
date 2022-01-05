import React from 'react';
import CreateComponentBook from '../../components/books/create-component-book';
import Title from '../../components/title/title';
import Section from '../../components/ui/section';

function UpdateBook() {
  return (
    <Section>
      <Title title="Enter book information" />
      <CreateComponentBook
        method="POST"
        url={`${process.env.REACT_APP_DOMAIN}/api/books`}
      />
    </Section>
  );
}

export default UpdateBook;
