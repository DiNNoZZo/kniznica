import React from 'react';
import CreateComponentLibrary from '../../components/libraries/create-component-library';
import Section from '../../components/ui/section';
import Title from '../../components/title/title';

function CreateLibrary() {
  return (
    <Section>
      <Title title="Enter library information" />
      <CreateComponentLibrary
        method="POST"
        url={`${process.env.REACT_APP_DOMAIN}/api/libraries`}
      />
    </Section>
  );
}

export default CreateLibrary;
