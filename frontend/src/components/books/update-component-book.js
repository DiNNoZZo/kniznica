import React, { Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import sendRequest from '../../utils/send-request';
import FormBook from './form-book';

function UpdateComponentBook({ url, method }) {
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

      console.log(data);

      if (data.status === 'success') navigate(`/books/${params.id}/detail`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Fragment>
      <FormBook
        handleSubmit={sendForm}
        type="PATCH"
        initialValues={{ name: '', writer: '', pages: '' }}
      />
    </Fragment>
  );
}

export default UpdateComponentBook;
