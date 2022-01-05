import React from 'react';
import { useNavigate } from 'react-router-dom';
import sendRequest from '../../utils/send-request';
import FormLibrary from './form-library';

function CreateComponentLibrary({ url, method }) {
  const navigate = useNavigate();

  const sendForm = async (values) => {
    try {
      const data = await sendRequest({
        url,
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: values,
      });

      if (data.status === 'success') navigate(`/libraries`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormLibrary
      handleSubmit={sendForm}
      type="POST"
      initialValues={{ name: '' }}
    />
  );
}

export default CreateComponentLibrary;
