import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import UpdateComponentStudent from '../../components/students/update-component-student';

function UpdateStudent() {
  const params = useParams();
  return (
    <Fragment>
      <UpdateComponentStudent
        method="PATCH"
        url={`${process.env.REACT_APP_DOMAIN}/api/students/${params.id}`}
      />
    </Fragment>
  );
}

export default UpdateStudent;
