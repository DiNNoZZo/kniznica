import React from 'react';

import Section from '../components/ui/section';
import Article from '../components/ui/article';
import Typography from '../components/ui/typography';
import Link from '../components/ui/link';
import Button from '../components/ui/button';
import classes from './home.module.scss';

function Home() {
  return (
    <Section styleClass={classes.home}>
      <Article>
        <Typography variant="subtitle1">
          A place where it's always organized
        </Typography>
        <div className={classes.home_title_big}>
          <Typography variant="h1">Sorted for your</Typography>
          <div className={classes.home_subtitle}>
            <Typography variant="body1">Libraries</Typography>
            <Typography variant="body1">Students</Typography>
            <Typography variant="body1">Books</Typography>
          </div>
        </div>
        <div className={classes.home_button}>
          <Link href="/libraries">
            <Button>Start your firs library</Button>
          </Link>
        </div>
      </Article>
      <Article>
        <Typography variant="subtitle1">
          The need for a library for more order.
        </Typography>
        <Typography variant="h1">It’s Time to Get Organized.</Typography>
        <div className={classes.text_area}>
          <Typography variant="body1">
            Things need to be kept tidy. That is why we offer you a unique
            service. All you have to do is register your library and you can
            manage the students and books you have available.
          </Typography>
        </div>
      </Article>
    </Section>
  );
}

export default Home;
