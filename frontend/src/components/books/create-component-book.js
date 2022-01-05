import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import sendRequest from '../../utils/send-request';
import FormStudent from './form-book';

function CreateComponentStudent({ url, method }) {
  const params = useParams();
  const navigate = useNavigate();

  const sendForm = async (values) => {
    values.library = params.id;

    try {
      const data = await sendRequest({
        url,
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: values,
      });

      if (data.status === 'success') navigate(`/libraries/${params.id}/detail`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormStudent
      handleSubmit={sendForm}
      type="POST"
      initialValues={{ name: '', writer: '', pages: '' }}
    />
  );
}

export default CreateComponentStudent;
