import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import DetailComponentLibrary from '../../components/libraries/detail-component-library';
import Section from '../../components/ui/section';
import classes from './libraries.module.scss';

function LibraryDetail() {
  const params = useParams();
  const [library, setLibrary] = useState();

  const getLibrary = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/libraries/${params.id}`
      );

      const data = await response.json();
      setLibrary(data.data);
    } catch (err) {
      console.log(err);
    }
  }, [params.id]);

  useEffect(() => {
    getLibrary();
  }, [getLibrary]);

  return (
    <Section styleClass={classes.libraries}>
      <DetailComponentLibrary library={library} />
    </Section>
  );
}

export default LibraryDetail;
