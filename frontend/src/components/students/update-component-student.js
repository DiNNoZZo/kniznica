import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import sendRequest from '../../utils/send-request';
import FormStudent from './form-student';
import Section from '../ui/section';
import Button from '../ui/button';
import Title from '../title/title';

function UpdateComponentStudent({ url, method }) {
  const params = useParams();
  const navigate = useNavigate();

  const sendForm = async (values) => {
    values.library = params.id;
    try {
      const data = await sendRequest({
        url,
        method,
        headers: { 'Content-Type': 'application/json' },
        body: values,
      });

      if (data.status === 'success') navigate(`/students/${params.id}/detail`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Section>
      <Title title="Enter student information">
        <Button variant="primary" onClick={() => console.log('go back')}>
          Back
        </Button>
      </Title>
      <FormStudent
        handleSubmit={sendForm}
        type="PATCH"
        initialValues={{ name: '', email: '' }}
      />
    </Section>
  );
}

export default UpdateComponentStudent;
