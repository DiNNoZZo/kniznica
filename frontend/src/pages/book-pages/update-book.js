import React from 'react';
import { useParams } from 'react-router-dom';
import UpdateComponentBook from '../../components/books/update-component-book';
import Title from '../../components/title/title';
import Section from '../../components/ui/section';
import Button from '../../components/ui/button';

function UpdateBook() {
  const params = useParams();
  return (
    <Section>
      <Title title="Enter book information">
        <Button variant="primary" onClick={() => console.log('go back')}>
          Back
        </Button>
      </Title>
      <UpdateComponentBook
        method="PATCH"
        url={`${process.env.REACT_APP_DOMAIN}/api/books/${params.id}`}
      />
    </Section>
  );
}

export default UpdateBook;
