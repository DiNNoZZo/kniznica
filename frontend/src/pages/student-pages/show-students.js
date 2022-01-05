import React, { useState, useCallback, useEffect } from 'react';
import AllStudents from '../../components/students/all-students';
import sendRequest from '../../utils/send-request';
import Section from '../../components/ui/section';
import Article from '../../components/ui/article';
import Title from '../../components/title/title';

function ShowStudents() {
  const [students, setStudents] = useState([]);

  const getData = useCallback(async () => {
    try {
      const { data } = await sendRequest({
        url: 'http://localhost:5000/api/students',
      });

      setStudents(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Section>
      <Title title="All Students" />
      <Article>
        <AllStudents students={students} />
      </Article>
    </Section>
  );
}

export default ShowStudents;
