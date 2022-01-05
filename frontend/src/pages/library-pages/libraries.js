import React, { useState, useEffect, useCallback } from 'react';
import sendRequest from '../../utils/send-request';
import AllLibrary from '../../components/libraries/all-library';
import Section from '../../components/ui/section';
import Title from '../../components/title/title';
import classes from './libraries.module.scss';

function Libraries() {
  const [libraries, setLibraries] = useState(null);

  const getData = useCallback(async () => {
    try {
      const { data } = await sendRequest({
        url: 'http://localhost:5000/api/libraries',
      });

      setLibraries(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Section styleClass={classes.libraries}>
      <Title title="All Libraries" />
      <AllLibrary libraries={libraries} />
    </Section>
  );
}

export default Libraries;
