import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import UpdateComponentLibrary from '../../components/libraries/update-component-library';

function CreateLibrary() {
  const params = useParams();
  return (
    <Fragment>
      <UpdateComponentLibrary
        url={`${process.env.REACT_APP_DOMAIN}/api/libraries/${params.id}`}
        method="PATCH"
      />
    </Fragment>
  );
}

export default CreateLibrary;
