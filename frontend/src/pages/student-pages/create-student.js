import React from 'react';
import CreateComponentStudent from '../../components/students/create-component-student';
import Title from '../../components/title/title';
import Section from '../../components/ui/section';
import Button from '../../components/ui/button';

function CreateLibrary() {
  return (
    <Section>
      <Title title="Enter student information">
        <Button variant="primary">Back</Button>
      </Title>
      <CreateComponentStudent
        method="POST"
        url={`${process.env.REACT_APP_DOMAIN}/api/students`}
      />
    </Section>
  );
}

export default CreateLibrary;
