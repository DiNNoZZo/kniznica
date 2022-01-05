import React, { Fragment } from 'react';
import Typography from '../ui/typography';
import Article from '../ui/article';
import Link from '../ui/link';
import Button from '../ui/button';
import classes from './all-library.module.scss';

function AllLibraries({ libraries }) {
  if (!libraries?.length > 0) {
    return (
      <Article>
        <Typography variant="h4">You have no libraries.</Typography>

        <Link href="/libraries/create">
          <Button variant="primary">Create Library</Button>
        </Link>
      </Article>
    );
  }

  return (
    <Fragment>
      <Article>
        <ul className={classes.list}>
          {libraries.map((library) => (
            <li key={library._id}>
              <div className={classes.text_area}>
                <Typography variant="body1">Name: {library.name}</Typography>
                <Typography variant="body1">
                  Books: {library.books.length}
                </Typography>
                <Typography variant="body1">
                  Students: {library.students.length}
                </Typography>
              </div>
              <div className={classes.buttons}>
                <Link href={`/libraries/${library._id}/detail`}>
                  <Button>
                    <Typography variant="body1">Go in</Typography>
                  </Button>
                </Link>
                <Link href={`/libraries/${library._id}/update`}>
                  <Button>
                    <Typography variant="body1">Update</Typography>
                  </Button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <Link href="/libraries/create">
          <Button variant="primary">Create Library</Button>
        </Link>
      </Article>
    </Fragment>
  );
}

export default AllLibraries;
