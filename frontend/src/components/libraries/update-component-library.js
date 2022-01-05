import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import sendRequest from '../../utils/send-request';
import FormLibrary from './form-library';
import Section from '../ui/section';
import Button from '../ui/button';
import Title from '../title/title';

function UpdateComponentLibrary({ url, method }) {
  const params = useParams();
  const navigate = useNavigate();

  const sendForm = async (values) => {
    try {
      const data = await sendRequest({
        url,
        method,
        headers: { 'Content-Type': 'application/json' },
        body: values,
      });

      if (data.status === 'success') navigate(`/libraries/${params.id}/detail`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Section>
      <Title title="Enter library information">
        <Button variant="primary" onClick={() => console.log('go back')}>
          Back
        </Button>
      </Title>
      <FormLibrary
        handleSubmit={sendForm}
        type="PATCH"
        initialValues={{ name: '' }}
      />
    </Section>
  );
}

export default UpdateComponentLibrary;
