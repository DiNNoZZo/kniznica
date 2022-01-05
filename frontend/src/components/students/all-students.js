import React from 'react';
import Typography from '../ui/typography';
import Button from '../ui/button';
import Link from '../ui/link';
import classes from './all-students.module.scss';

function AllStudents({ students }) {
  if (!students[0]?.name) {
    return (
      <Typography variant="h6">There are no students here yet.</Typography>
    );
  }

  return (
    <div className={classes.container}>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <div className={classes.text_area}>
              <Typography variant="body1">Name: {student.name}</Typography>

              <Typography variant="body2">Contact: {student.email}</Typography>

              <Typography variant="body2">
                Library: {student.library.name}
              </Typography>

              <Typography variant="body2">
                Reading:{' '}
                {student.reading.active ? student.reading.book.name : 'none'}
              </Typography>
            </div>
            <div className={classes.buttons}>
              <Link href={`/students/${student.id}/detail`}>
                <Button variant="primary">Detail</Button>
              </Link>

              <Link href={`/students/${student.id}/update`}>
                <Button variant="primary">Update</Button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllStudents;
